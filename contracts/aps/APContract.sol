// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.7.0;
pragma experimental ABIEncoderV2;

import "./ChainlinkService.sol";

contract APContract is ChainlinkService{

    struct Asset{
        string name;
        address feedAddress;
        bool created;
        string symbol;
    }

    struct Protocol{
        string name;
        bool created;
        string symbol;
    }

    struct Vault{
        mapping(address => bool) vaultAssets;
        mapping(address => bool) vaultDepositAssets;
        mapping(address => bool) vaultWithdrawalAssets;
        mapping(address => bool) vaultEnabledStrategy;
        mapping(address => bool) vaultEnabledProtocols;
        address vaultAPSManager;
        address vaultStrategyManager;
        string[] whitelistGroup;
        bool created;
    }

    mapping(address => mapping(address => mapping(address => bool))) vaultStrategyEnabledProtocols;

    mapping(address => address) vaultActiveStrategy;
    
    mapping(address => mapping(address => address)) vaultStrategyActiveProtocol;

    struct Strategy{
        string strategyName;
        mapping(address => bool) strategyProtocols;
        bool created;
    }

    event VaultCreation(address vaultAddress);

    mapping(address => Asset) assets;

    mapping(address => Protocol) protocols;

    mapping(address => Vault) vaults;

    mapping(address => Strategy) strategies;

    mapping(address => mapping(address => address)) public converters;

    mapping(address => address) safeOwner;

    address private MasterCopy;

    address private yieldsterDAO;

    mapping(address => bool) APSManagers;

    address private whitelistModule;

    address public whitelistManager;

    address public proxyFactory;


    constructor(
        address _MasterCopy, 
        address _whitelistModule
        ) 
        public
        {
            yieldsterDAO = msg.sender;
            APSManagers[msg.sender] = true;
            MasterCopy = _MasterCopy;
            whitelistModule = _whitelistModule;
        }

    function addProxyFactory(address _proxyFactory)
    public
    onlyManager
    {
        proxyFactory = _proxyFactory;
    }

//Modifiers
    modifier onlyYieldsterDAO
    {
        require(yieldsterDAO == msg.sender, "Only Yieldster DAO is allowed to perform this operation");
        _;
    }

    modifier onlyManager
    {
        require(APSManagers[msg.sender], "Only APS managers allowed to perform this operation!");
        _;
    }

    modifier onlySafeOwner
    {
        require(safeOwner[msg.sender] == tx.origin, "Only safe Owner can perform this operation");
        _;
    }


//Managers
    function addManager(address _manager) 
    public
    onlyYieldsterDAO
    {
        APSManagers[_manager] = true;
    }

    function removeManager(address _manager)
    public
    onlyYieldsterDAO
    {
        APSManagers[_manager] = false;
    } 

    function changeWhitelistManager(address _whitelistManager)
    public
    onlyYieldsterDAO
    {
        whitelistManager = _whitelistManager;
    }

    function getYieldsterDAO()
    view
    public 
    returns(address)
    {
        return yieldsterDAO;
    }

    function getwhitelistModule()
    view
    public 
    returns(address)
    {
        return whitelistModule;
    }

    function changeVaultAPSManager(address _vaultAPSManager)
    external
    {
        require(vaults[msg.sender].created, "Vault is not present");
        require(APSManagers[_vaultAPSManager], "address not a member of APS Manager list");
        vaults[msg.sender].vaultAPSManager = _vaultAPSManager;
    }
    function changeVaultStrategyManager(address _vaultStrategyManager)
    external
    {
        require(vaults[msg.sender].created, "Vault is not present");
        vaults[msg.sender].vaultStrategyManager = _vaultStrategyManager;
    }

//Converters
    function setConverter(
        address _input,
        address _output,
        address _converter
    ) 
    public 
    onlyManager
    {
        converters[_input][_output] = _converter;
    }

//Vaults
    function createVault(address _owner, address _vaultAddress)
    public
    {
        require(msg.sender == proxyFactory, "Only Proxy Factory can perform this operation");
        safeOwner[_vaultAddress] = _owner;
    }


    function addVault(
        address[] memory _vaultDepositAssets,
        address[] memory _vaultWithdrawalAssets,
        address[] memory _vaultEnabledStrategies,
        address _vaultAPSManager,
        address _vaultStrategyManager,
        string[] memory _whitelistGroup,
        address _owner
    )
    public
    {   
        require(safeOwner[msg.sender] == _owner, "Only owner can call this function");
        require(APSManagers[_vaultAPSManager], "Invalid APS Manager provided");
        Vault memory newVault = Vault(
            {
            vaultAPSManager:_vaultAPSManager, 
            vaultStrategyManager:_vaultStrategyManager,
            whitelistGroup:_whitelistGroup, 
            created:true
            });

        vaults[msg.sender] = newVault;

        for (uint256 i = 0; i < _vaultDepositAssets.length; i++) {
            address asset = _vaultDepositAssets[i];
            require(_isAssetPresent(asset), "Asset not supported by Yieldster");
            vaults[msg.sender].vaultAssets[asset] = true;
            vaults[msg.sender].vaultDepositAssets[asset] = true;
        }
        for (uint256 i = 0; i < _vaultWithdrawalAssets.length; i++) {
            address asset = _vaultWithdrawalAssets[i];
            require(_isAssetPresent(asset), "Asset not supported by Yieldster");
            vaults[msg.sender].vaultAssets[asset] = true;
            vaults[msg.sender].vaultWithdrawalAssets[asset] = true;
        }
        for (uint256 i = 0; i < _vaultEnabledStrategies.length; i++) {
            address strategy = _vaultEnabledStrategies[i];
            require(strategies[strategy].created, "Strategy not present");
            vaults[msg.sender].vaultEnabledStrategy[strategy] = true;
        }

    }

    function setVaultActiveStrategy(
        address _vaultAddress,
        address _strategyAddress
    )
    external
    {
        require(vaults[_vaultAddress].created, "Vault not present");
        require(strategies[_strategyAddress].created, "Strategy not present");
        require(vaults[_vaultAddress].vaultAPSManager == msg.sender, "Only the vault Manager can perform this operation");
        vaultActiveStrategy[_vaultAddress] = _strategyAddress;
    }

    function getVaultActiveStrategy(address _vaultAddress)
    public
    view
    returns(address)
    {
        require(vaults[_vaultAddress].created, "Vault not present");
        return vaultActiveStrategy[_vaultAddress];
    }

    function setVaultStrategyAndProtocol(
        address _vaultStrategy,
        address[] calldata _strategyProtocols
    )
    external
    {
        require(vaults[msg.sender].created, "Vault not present");
        require(strategies[_vaultStrategy].created, "Strategy not present");
        vaults[msg.sender].vaultEnabledStrategy[_vaultStrategy] = true;

        for (uint256 i = 0; i < _strategyProtocols.length; i++) {
            address protocol = _strategyProtocols[i];
            require(_isProtocolPresent(protocol), "Protocol not supported by Yieldster");
            vaultStrategyEnabledProtocols[msg.sender][_vaultStrategy][protocol] = true;
        }
    }

    function setvaultStrategyActiveProtocol(
        address _vaultAddress,
        address _strategyAddress,
        address _protocolAddress
    )
    public
    {
        require(vaults[_vaultAddress].created, "Vault not present");
        require(strategies[_strategyAddress].created, "Strategy not present");
        require(protocols[_protocolAddress].created, "Protocol not present");
        require(vaults[_vaultAddress].vaultEnabledStrategy[_strategyAddress], "This strategy is not enabled for Vault");
        require(vaultStrategyEnabledProtocols[_vaultAddress][_strategyAddress][_protocolAddress], "Protocol is not enabled for the provided strategy");
        require(vaults[_vaultAddress].vaultAPSManager == msg.sender, "Only the vault Manager can perform this operation");
        vaultStrategyActiveProtocol[_vaultAddress][_strategyAddress] = _protocolAddress;
    }

    function _isVaultPresent(address _address) 
        private 
        view 
        returns(bool)
    {
        return vaults[_address].created;
    }
    

    

// Assets
    function _isAssetPresent(address _address) 
        private 
        view 
        returns(bool)
    {
        return assets[_address].created;
    }
    

    function addAsset(
        string memory _symbol, 
        string memory _name,
        address feedAddress,
        address _tokenAddress
        ) 
        public 
        onlyManager
        {
        require(!_isAssetPresent(_tokenAddress),"Asset already present!");
        Asset memory newAsset=Asset({name:_name, feedAddress:feedAddress, created:true, symbol:_symbol});
        assets[_tokenAddress]=newAsset;
    }

    function removeAsset(address _tokenAddress) 
        public 
        onlyManager
        {
        require(_isAssetPresent(_tokenAddress),"Asset not present!");
        delete assets[_tokenAddress];
    }
    
    function getAssetDetails(address _tokenAddress) 
        public 
        view 
        returns(string memory, address, string memory)
    {
        require(_isAssetPresent(_tokenAddress),"Asset not present!");
        return(assets[_tokenAddress].name, assets[_tokenAddress].feedAddress, assets[_tokenAddress].symbol);

    }


    function getUSDPrice(address _tokenAddress) 
        public 
        returns(int,uint)
    {
        require(_isAssetPresent(_tokenAddress),"Asset not present!");
        return getLatestPrice(assets[_tokenAddress].feedAddress);
    }

    function isDepositAsset(address _assetAddress)
    public
    view
    returns(bool)
    {
        require(vaults[msg.sender].created, "Vault not present");
        return vaults[msg.sender].vaultDepositAssets[_assetAddress];
    }
    
    function isWithdrawalAsset(address _assetAddress)
    public
    view
    returns(bool)
    {
        require(vaults[msg.sender].created, "Vault not present");
        return vaults[msg.sender].vaultWithdrawalAssets[_assetAddress];
    }

//Strategies
    function _isStrategyPresent(address _address) 
        private 
        view 
        returns(bool)
    {
        return strategies[_address].created;
    }

    function addStrategy(
        string memory _strategyName,
        address _strategyAddress,
        address[] memory _strategyProtocols
        ) 
        public 
        onlyManager
    {
        require(!_isStrategyPresent(_strategyAddress),"Strategy already present!");
        Strategy memory newStrategy = Strategy({ strategyName:_strategyName, created:true });
        strategies[_strategyAddress] = newStrategy;

        for (uint256 i = 0; i < _strategyProtocols.length; i++) {
            address protocol = _strategyProtocols[i];
            require(_isProtocolPresent(protocol), "Protocol not supported by Yieldster");
            strategies[_strategyAddress].strategyProtocols[protocol] = true;
        }
        
    }

    function removeStrategy(address _strategyAddress) 
        public 
        onlyManager
    {
        require(_isStrategyPresent(_strategyAddress),"Strategy not present!");
        delete strategies[_strategyAddress];
    }

// Protocols
    function _isProtocolPresent(address _address) 
        private 
        view 
        returns(bool)
    {
        return protocols[_address].created;
    }

    function addProtocol(
        string memory _symbol,
        string memory _name,
        address _protocolAddress
        ) 
        public 
        onlyManager
    {
        require(!_isProtocolPresent(_protocolAddress),"Protocol already present!");
        Protocol memory newProtocol = Protocol({ name:_name, created:true, symbol:_symbol });
        protocols[_protocolAddress] = newProtocol;
    }

    function removeProtocol(address _protocolAddress) 
        public 
        onlyManager
    {
        require(_isProtocolPresent(_protocolAddress),"Protocol not present!");
        delete protocols[_protocolAddress];
    }

}