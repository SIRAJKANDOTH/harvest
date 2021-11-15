// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;
pragma solidity ^0.5.0;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./interfaces/convex/IConvex.sol";
import "./interfaces/convex/IRewards.sol";
import "../interfaces/ICrvAddressProvider.sol";
import "../interfaces/ICrvRegistry.sol";
import "../interfaces/IExchangeRegistry.sol";
import "../interfaces/IExchange.sol";
import "../interfaces/ICrvPool.sol";
import "../interfaces/ICrv3Pool.sol";
import "../interfaces/IAPContract.sol";
import "../interfaces/IHexUtils.sol";

contract ConvexCRV is ERC20, ERC20Detailed {
    using SafeERC20 for IERC20;
    using SafeMath for uint256;

    address public APContract;
    address public owner;
    address private crv3Token = 0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490;
    address private crvAddressProvider =
        0x0000000022D53366457F9d5E68Ec105046FC4383;
    uint256 slippage = 50; //  0.5% slippage
    uint256 slippageSwap = 50; //  0.5% slippage on swap

    uint256 public poolInfoID;
    uint256 public protocolBalance;
    address public baseToken;
    address public convexDeposit = 0xF403C135812408BFbE8713b5A23a04b3D48AAE31;
    mapping(address => bool) isRegistered;

    modifier onlyRegisteredVault() {
        require(isRegistered[msg.sender], "Not a registered Safe");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only permitted to owner");
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        address _APContract,
        uint256 _poolInfoID,
        address _baseToken
    )
        public
        ERC20Detailed(
            string(abi.encodePacked("yl-cvxfi", _symbol)),
            string(abi.encodePacked("yl-cvx", _name)),
            18
        )
    {
        APContract = _APContract;
        poolInfoID = _poolInfoID;
        baseToken = _baseToken;
        owner = msg.sender;
    }

    /// @dev Function to subscribe a new vault to the strategy.
    function registerSafe() external {
        isRegistered[msg.sender] = true;
    }

    /// @dev Function to unsubscribe a vault from the strategy.
    function deRegisterSafe() external onlyRegisteredVault {
        isRegistered[msg.sender] = false;
    }

    /// @dev Function to set slippage settings when performing exchanges.
    /// @param _slippageSwap Slippage value.
    function setSlippageSwap(uint256 _slippageSwap) external onlyOwner {
        require(_slippageSwap < 10000, "! percentage");
        slippageSwap = _slippageSwap;
    }

    /// @dev Function to set slippage settings when interacting with Curve pools.
    /// @param _slippage Slippage value.
    function setSlippage(uint256 _slippage) external onlyOwner {
        require(_slippage < 10000, "! percentage");
        slippage = _slippage;
    }

    /// @dev Function to set the address of the Yieldster APS.
    /// @param _APContract Address of the APS Contract.
    function setAPContract(address _APContract) external onlyOwner {
        APContract = _APContract;
    }

    /// @dev Function to set the convex deposit contract
    /// @param _convexDeposit address of convex deposit contract
    function setConvexDeposit(address _convexDeposit) external onlyOwner {
        convexDeposit = _convexDeposit;
    }

    /// @dev Function to set convex pool to the strategy.
    /// @param _poolInfoID poolInfoID of the convex pool.
    /// @param _baseToken baseToken of the convex pool.

    function setProtocol(uint256 _poolInfoID, address _baseToken)
        external
        onlyOwner
    {
        require(_poolInfoID >= 0, "Cannot be zero");
        require(
            _poolInfoID < IConvex(convexDeposit).poolLength(),
            "Cannot be zero"
        );

        poolInfoID = _poolInfoID;
        baseToken = _baseToken;
    }

    /// @dev Function to change convex deposit contract
    /// @param _depositContractAddress Address of the new deposit contract

    function changeDepositContract(address _depositContractAddress)
        external
        onlyOwner
    {
        require(_depositContractAddress != address(0), "Zero address");
        convexDeposit = _depositContractAddress;
    }

    function getConvexBalance() public view returns (uint256) {
        (, , , address baseRewards, , ) = IConvex(convexDeposit).poolInfo(
            poolInfoID
        );
        return IRewards(baseRewards).balanceOf(address(this));
    }

    /// @dev Function to approve a token.
    /// @param _token Address of the token.
    /// @param _spender Address of the spender.
    /// @param _amount Amount of tokens to approve.
    function _approveToken(
        address _token,
        address _spender,
        uint256 _amount
    ) internal {
        if (IERC20(_token).allowance(address(this), _spender) > 0) {
            IERC20(_token).safeApprove(_spender, 0);
            IERC20(_token).safeApprove(_spender, _amount);
        } else IERC20(_token).safeApprove(_spender, _amount);
    }

    /// @dev Function that returns the address of the Curve Registry contract.
    function getRegistry() internal view returns (address) {
        return ICrvAddressProvider(crvAddressProvider).get_registry();
    }

    /// @dev Function to deposit DAI | USDC | USDT to Curve 3 Pool.
    /// @param assets Address List of the token.
    /// @param amounts Amount List of the token.
    /// @param min_mint_amount Min amount of 3Crv tokens expected.
    function depositToCurve3Pool(
        address[3] memory assets,
        uint256[3] memory amounts,
        uint256 min_mint_amount
    ) internal returns (uint256) {
        address pool = ICrvRegistry(getRegistry()).get_pool_from_lp_token(
            crv3Token
        );
        for (uint256 i = 0; i < assets.length; i++) {
            if (amounts[i] > 0) _approveToken(assets[i], pool, amounts[i]);
        }
        uint256 crv3TokenBefore = IERC20(crv3Token).balanceOf(address(this));
        ICrv3Pool(pool).add_liquidity(amounts, min_mint_amount);
        uint256 crv3TokenAfter = IERC20(crv3Token).balanceOf(address(this));
        uint256 returnAmount = crv3TokenAfter.sub(crv3TokenBefore);
        return returnAmount;
    }

    function calculateSlippage(
        address fromToken,
        address toToken,
        uint256 amount,
        uint256 slippagePercent
    ) internal view returns (uint256) {
        uint256 fromTokenUSD = IAPContract(APContract).getUSDPrice(fromToken);
        uint256 toTokenUSD = IAPContract(APContract).getUSDPrice(toToken);
        uint256 fromTokenAmountDecimals = IHexUtils(
            IAPContract(APContract).stringUtils()
        ).toDecimals(fromToken, amount);

        uint256 expectedToTokenDecimal = (
            fromTokenAmountDecimals.mul(fromTokenUSD)
        ).div(toTokenUSD);
        uint256 expectedToToken = IHexUtils(
            IAPContract(APContract).stringUtils()
        ).fromDecimals(toToken, expectedToTokenDecimal);
        uint256 minReturn = expectedToToken - //SLIPPAGE
            expectedToToken.mul(slippagePercent).div(10000);
        return minReturn;
    }

    /// @dev Function to exchange from one token to another.
    /// @param fromToken Address of from token.
    /// @param toToken Address of target token.
    /// @param amount Amount of tokens to exchange.
    function exchangeToken(
        address fromToken,
        address toToken,
        uint256 amount
    ) internal returns (uint256) {
        uint256 exchangeReturn;
        IExchangeRegistry exchangeRegistry = IExchangeRegistry(
            IAPContract(APContract).exchangeRegistry()
        );
        address exchange = exchangeRegistry.getPair(fromToken, toToken);
        require(exchange != address(0), "Exchange pair not present");

        uint256 minReturn = calculateSlippage(
            fromToken,
            toToken,
            amount,
            slippageSwap
        );

        _approveToken(fromToken, exchange, amount);
        exchangeReturn = IExchange(exchange).swap(
            fromToken,
            toToken,
            amount,
            minReturn
        );
        return exchangeReturn;
    }

    /// @dev Function to handle tokens other than DAI | USDC | USDT.
    /// @param otherAssets Address List of tokens.
    /// @param otherAmounts Amount List of tokens.
    function handleOtherTokens(
        address[] memory otherAssets,
        uint256[] memory otherAmounts
    )
        internal
        returns (
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        (address crvLPToken, address boosterDepositToken, , , , ) = IConvex(
            convexDeposit
        ).poolInfo(poolInfoID);
        uint256 underlyingTokens;
        uint256 crv3Tokens;
        uint256 baseTokens;
        uint256 cvxTokens;
        for (uint256 i = 0; i < otherAssets.length; i++) {
            if (otherAssets[i] == crvLPToken)
                underlyingTokens += otherAmounts[i]; //asset3CRV Token
            else if (otherAssets[i] == baseToken)
                baseTokens += otherAmounts[i]; //baseAsset token
            else if (otherAssets[i] == crv3Token)
                crv3Tokens += otherAmounts[i]; //3CRV Token
            else if (otherAssets[i] == boosterDepositToken)
                cvxTokens += otherAmounts[i]; //cvx deposit tokens
            else {
                crv3Tokens += exchangeToken(
                    otherAssets[i],
                    crv3Token,
                    otherAmounts[i]
                );
            }
        }
        return (underlyingTokens, crv3Tokens, baseTokens, cvxTokens);
    }

    /// @dev Function to deposit 3Crv to Target Pool.
    /// @param crv3Amount Amount of 3Crv tokens.
    /// @param baseAmount Amount of base tokens.
    function depositToTargetPool(uint256 crv3Amount, uint256 baseAmount)
        internal
        returns (uint256)
    {
        (address crvLPToken, , , , , ) = IConvex(convexDeposit).poolInfo(
            poolInfoID
        );
        uint256 min_mint_amount;
        address pool = ICrvRegistry(getRegistry()).get_pool_from_lp_token(
            crvLPToken
        );
        uint256[2] memory poolNCoins = ICrvRegistry(getRegistry()).get_n_coins(
            pool
        );
        address[8] memory poolCoins = ICrvRegistry(getRegistry()).get_coins(
            pool
        );
        uint256 index = poolNCoins[0];
        uint256[2] memory amounts;

        for (uint256 i = 0; i < index; i++) {
            if (poolCoins[i] == crv3Token) {
                amounts[i] = crv3Amount;
                if (crv3Amount > 0) {
                    _approveToken(crv3Token, pool, crv3Amount);
                    min_mint_amount += calculateSlippage(
                        crv3Token,
                        crvLPToken,
                        crv3Amount,
                        slippage
                    );
                }
            } else if (poolCoins[i] == baseToken) {
                amounts[i] = baseAmount;
                if (baseAmount > 0) {
                    _approveToken(baseToken, pool, baseAmount);
                    min_mint_amount += calculateSlippage(
                        baseToken,
                        crvLPToken,
                        baseAmount,
                        slippage
                    );
                }
            }
        }
        uint256 underlyingBefore = IERC20(crvLPToken).balanceOf(address(this));
        ICrvPool(pool).add_liquidity(amounts, min_mint_amount);
        uint256 underlyingAfter = IERC20(crvLPToken).balanceOf(address(this));
        return underlyingAfter.sub(underlyingBefore);
    }

    /// @dev Function to Deposit to convex
    /// @param amount amount to deposit.
    function depositToCVX(uint256 amount) internal returns (uint256) {
        (address crvLPToken, , , , , ) = IConvex(convexDeposit).poolInfo(
            poolInfoID
        );
        _approveToken(crvLPToken, convexDeposit, amount);
        bool status = IConvex(convexDeposit).deposit(poolInfoID, amount, true);
        if (status) return amount;
        else revert("Deposit to CVX Failed");
    }

    /// @dev Function to stake to convex
    /// @param amount amount to deposit.
    function stakeToCVX(uint256 amount) internal returns (uint256) {
        (, address boosterDepositToken, , address baseRewards, , ) = IConvex(
            convexDeposit
        ).poolInfo(poolInfoID);
        // _approveToken(boosterDepositToken, baseRewards, amount);
        IRewards(baseRewards).stakeFor(address(this), amount);
        return amount;
    }

    /// @dev Function to handle strategy deposit function.
    /// @param data Encoded parameters to be used.
    function handleDeposit(bytes memory data) internal returns (uint256) {
        uint256 crv3PoolReturn;
        uint256 CVXUnderlyingReturn;
        uint256 otherCVXUnderlyingReturn;
        uint256 cvxStakedReturns;
        uint256 CVXUnderlyingTokens;
        uint256 other3CrvReturn;
        uint256 otherBaseReturn;
        uint256 cvxTokens;
        (
            address[3] memory crv3Assets,
            uint256[3] memory crv3Amounts,
            uint256 min3CrvMint,
            address[] memory otherAssets,
            uint256[] memory otherAmounts
        ) = abi.decode(
                data,
                (address[3], uint256[3], uint256, address[], uint256[])
            );

        if (min3CrvMint > 0) {
            crv3PoolReturn = depositToCurve3Pool( //3crv token
                crv3Assets,
                crv3Amounts,
                min3CrvMint
            );
        }

        if (otherAssets.length > 0) {
            (
                otherCVXUnderlyingReturn, //asset 3crv token
                other3CrvReturn, //3crv token
                otherBaseReturn, //asset token
                cvxTokens
            ) = handleOtherTokens(otherAssets, otherAmounts);
        }

        if (crv3PoolReturn + other3CrvReturn > 0 || otherBaseReturn > 0)
            CVXUnderlyingReturn = depositToTargetPool( //asset 3crv token
                crv3PoolReturn + other3CrvReturn,
                otherBaseReturn
            );

        if (CVXUnderlyingReturn + otherCVXUnderlyingReturn > 0)
            CVXUnderlyingTokens = depositToCVX(
                CVXUnderlyingReturn + otherCVXUnderlyingReturn
            );

        if (cvxTokens > 0) cvxStakedReturns = stakeToCVX(cvxTokens);
        return cvxStakedReturns + CVXUnderlyingTokens;
    }

    /// @dev Function to deposit into strategy.
    /// @param _depositAssets Address List of total assets being deposited.
    /// @param _amounts Amounts List of total assets being deposited.
    /// @param data Encoded parameters to be used.
    function deposit(
        address[] calldata _depositAssets,
        uint256[] calldata _amounts,
        bytes calldata data
    ) external onlyRegisteredVault {
        (address crvLPToken, , , , , bool shutdown) = IConvex(convexDeposit)
            .poolInfo(poolInfoID);

        require(shutdown != true, "Pool shutdown");
        address pool = ICrvRegistry(getRegistry()).get_pool_from_lp_token(
            crvLPToken
        );
        require(pool != address(0), "pool not present");

        for (uint256 i = 0; i < _depositAssets.length; i++) {
            if (_amounts[i] > 0) {
                IERC20(_depositAssets[i]).safeTransferFrom(
                    msg.sender,
                    address(this),
                    _amounts[i]
                );
            }
        }

        uint256 cvxPoolTokens = handleDeposit(data);

        uint256 _shares;
        if (totalSupply() == 0) _shares = cvxPoolTokens;
        else _shares = getMintValue(getDepositNAV(crvLPToken, cvxPoolTokens));
        protocolBalance += cvxPoolTokens;

        if (_shares > 0) _mint(msg.sender, _shares);
    }

    /// @dev Function to calculate the strategy tokens to be minted for given nav.
    /// @param depositNAV NAV for the amount.
    function getMintValue(uint256 depositNAV) public view returns (uint256) {
        return (depositNAV.mul(totalSupply())).div(getStrategyNAV());
    }

    /// @dev Function to calculate the NAV of strategy for a subscribed vault | if the msg.sender is
    function getStrategyNAV() public view returns (uint256) {
        (address crvLPToken, , , , , ) = IConvex(convexDeposit).poolInfo(
            poolInfoID
        );

        if (protocolBalance > 0) {
            uint256 tokenUSD = IAPContract(APContract).getUSDPrice(crvLPToken); //TODO: CHECK AND CONFIRM
            uint256 balance = IHexUtils(IAPContract(APContract).stringUtils())
                .toDecimals(crvLPToken, protocolBalance);
            return (balance.mul(tokenUSD)).div(1e18);
        } else return 0;
    }

    /// @dev Function to calculate the NAV of a given token and amount.
    /// @param _tokenAddress Address of the deposit token.
    /// @param _amount Amount of deposit token.
    function getDepositNAV(address _tokenAddress, uint256 _amount)
        public
        view
        returns (uint256)
    {
        uint256 tokenUSD = IAPContract(APContract).getUSDPrice(_tokenAddress);
        return
            (
                IHexUtils(IAPContract(APContract).stringUtils())
                    .toDecimals(_tokenAddress, _amount)
                    .mul(tokenUSD)
            ).div(1e18);
    }

    /// @dev Function to calculate the token value of strategy for a subscribed Safe, if msg.sender is
    function tokenValueInUSD() public view returns (uint256) {
        if (getStrategyNAV() == 0 || totalSupply() == 0) return 0;
        else return (getStrategyNAV().mul(1e18)).div(totalSupply());
    }

    /// @dev Function to withdraw strategy shares.
    /// @param _shares amount of strategy shares to withdraw.
    /// @param _withdrawalAsset Address of the prefered withdrawal asset.
    function withdraw(uint256 _shares, address _withdrawalAsset)
        public
        onlyRegisteredVault
        returns (
            bool,
            address,
            uint256
        )
    {
        require(balanceOf(msg.sender) >= _shares, "Not enough shares");
        uint256 strategyTokenValueInUSD = (_shares.mul(getStrategyNAV())).div(
            totalSupply()
        );

        (
            address underlying,
            address boosterDepositToken,
            ,
            address baseRewards,
            ,
            bool shutdown
        ) = IConvex(convexDeposit).poolInfo(poolInfoID);
        require(shutdown != true, "Pool shutdown");

        // uint256 protocolTokenUSD = IAPContract(APContract).getUSDPrice(
        //     boosterDepositToken
        // ); //UNCOMMENT IN PRODUCTION
        uint256 protocolTokenUSD = IAPContract(APContract).getUSDPrice(
            underlying
        );
        uint256 protocolTokenCount = strategyTokenValueInUSD.mul(1e18).div(
            protocolTokenUSD
        );
        uint256 protocolTokensToWithdraw = IHexUtils(
            IAPContract(APContract).stringUtils()
        ).fromDecimals(boosterDepositToken, protocolTokenCount);

        _burn(msg.sender, _shares);
        protocolBalance -= protocolTokensToWithdraw;

        if (
            _withdrawalAsset == address(0) ||
            _withdrawalAsset == boosterDepositToken
        ) {
            //Transfer deposit token directly to user
            bool status = IRewards(baseRewards).withdraw(
                protocolTokensToWithdraw,
                false
            );
            require(status == true, "Error in withdraw");
            IERC20(boosterDepositToken).safeTransfer(
                msg.sender,
                protocolTokensToWithdraw
            );
            return (true, boosterDepositToken, protocolTokensToWithdraw);
        } else {
            bool status = IRewards(baseRewards).withdrawAndUnwrap(
                protocolTokensToWithdraw,
                false
            );
            require(status, "Error in withdrawUnwrap");
            //Tranfer underlying crv lptoken to user
            if (_withdrawalAsset == underlying) {
                IERC20(underlying).safeTransfer(
                    msg.sender,
                    protocolTokensToWithdraw
                );
                return (true, underlying, protocolTokensToWithdraw);
            }
            //Transfer the base asset token to the user
            else if (_withdrawalAsset == baseToken) {
                uint256 baseTokens = withdrawFromPool(
                    baseToken,
                    underlying,
                    protocolTokensToWithdraw
                );
                IERC20(baseToken).safeTransfer(msg.sender, baseTokens);
                return (true, baseToken, baseTokens);
            } else {
                address __withdrawalAsset = _withdrawalAsset;

                uint256 crv3Tokens = withdrawFromPool(
                    crv3Token,
                    underlying,
                    protocolTokensToWithdraw
                );
                if (__withdrawalAsset == crv3Token) {
                    IERC20(crv3Token).safeTransfer(msg.sender, crv3Tokens);
                    return (true, crv3Token, crv3Tokens);
                }
                uint256 withdrawalTokens = exchangeToken(
                    crv3Token,
                    __withdrawalAsset,
                    crv3Tokens
                );
                IERC20(__withdrawalAsset).safeTransfer(
                    msg.sender,
                    withdrawalTokens
                );
                return (true, __withdrawalAsset, withdrawalTokens);
            }
        }
    }

    /// @dev Function to remove Liquidity from Curve pool into 3Crv.
    /// @param lpToken Address of the LP token of the Curve pool.
    /// @param amount Amount of LP tokens.
    function withdrawFromPool(
        address toToken,
        address lpToken,
        uint256 amount
    ) internal returns (uint256) {
        uint256 toTokenReturn;
        address pool = ICrvRegistry(getRegistry()).get_pool_from_lp_token(
            lpToken
        );

        uint256[2] memory poolNCoins = ICrvRegistry(getRegistry()).get_n_coins(
            pool
        );
        address[8] memory poolCoins = ICrvRegistry(getRegistry()).get_coins(
            pool
        );
        uint256 index = poolNCoins[0];

        uint256 minReturn = calculateSlippage(
            lpToken,
            toToken,
            amount,
            slippage
        );

        for (uint256 i = 0; i < index; i++) {
            if (poolCoins[i] == toToken) {
                toTokenReturn = ICrvPool(pool).remove_liquidity_one_coin(
                    amount,
                    int128(int256(i)),
                    minReturn
                );
            }
        }

        return toTokenReturn;
    }

    /// @dev Function to withdraw all shares from strategy.
    /// @param _withdrawalAsset Address of the prefered withdrawal asset.
    function withdrawAllToSafe(address _withdrawalAsset)
        external
        onlyRegisteredVault
        returns (
            bool,
            address,
            uint256
        )
    {
        return withdraw(balanceOf(msg.sender), _withdrawalAsset);
    }

    /// @dev Function to use in an Emergency, when a token gets stuck in the strategy.
    /// @param _tokenAddres Address of the token.
    /// @param _tokenAmount Amount of the token.
    function inCaseTokenGetsStuck(address _tokenAddres, uint256 _tokenAmount)
        external
    {
        require(
            msg.sender == IAPContract(APContract).yieldsterDAO(),
            "unauthorized"
        );
        IERC20(_tokenAddres).safeTransfer(msg.sender, _tokenAmount);
    }
}

/**
vault owner 0x5091aF48BEB623b3DA0A53F726db63E13Ff91df9 vault address 0x0Ad1202df38CE0ceF1f4Dc4F19865F591F0F50b4
Register Vault with APS
Set Vault Assets
set vault strategy and boosterDepositToken
Activating vault strategy  0xDBB0F40e68D7Bd2fa21302Fc7B8759526E9b80F9
Vault active strategies [ '0xDBB0F40e68D7Bd2fa21302Fc7B8759526E9b80F9' ]


let vault = await YieldsterVault.at("0x5acFb987cB222064BfD361026a39D9B249343085")
let convex = await ConvexCRV.at("0xBA64eD2bcf7E8B053155A967FB270d3BdC2E6326")
(await convex.getConvexBalance()).toString()

let convexDeposit = await IConvex.at("0xF403C135812408BFbE8713b5A23a04b3D48AAE31")
let rewards = await IRewards.at("0x4a2631d090e8b40bBDe245e687BF09e5e534A239")
let usdncrv = await ERC20.at("0x4f3E8F405CF5aFC05D68142F3783bDfE13811522")
let cvxDeposit = await ERC20.at("0x3689f325E88c2363274E5F3d44b6DaB8f9e1f524")
let cvx = await ERC20.at("0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B")
let crv= await ERC20.at("0xD533a949740bb3306d119CC777fa900bA034cd52")

(await crv.balanceOf("0x5091aF48BEB623b3DA0A53F726db63E13Ff91df9")).toString()


await usdncrv.approve("0xF403C135812408BFbE8713b5A23a04b3D48AAE31",'1000000000000000000000',{from:"0x5091aF48BEB623b3DA0A53F726db63E13Ff91df9"})

await convexDeposit.deposit('13','1000000000000000000000',true,{from:"0x5091aF48BEB623b3DA0A53F726db63E13Ff91df9"})

(await cvxDeposit.balanceOf(rewards.address)).toString()
(await rewards.balanceOf("0x5091aF48BEB623b3DA0A53F726db63E13Ff91df9")).toString()
(await rewards.withdraw("5000000000000000000000",true))

//before :- 352295220509407991407258477
//after  :- 352296220509407991407258477
{from:"0x5091aF48BEB623b3DA0A53F726db63E13Ff91df9"}

{from:"0xb2AA4a5DF3641D42e72D7F07a40292794dfD07a0"






 */