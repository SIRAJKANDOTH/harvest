// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.7.0;
pragma experimental ABIEncoderV2;
import "../storage/VaultStorage.sol";

contract Exchange
    is 
    VaultStorage
{

    /// @dev Function to exchange tokens to for a target token.
    /// @param targetToken Address of the target token.
    /// @param nav Nav to exchange.
    function exchangeToken(address targetToken, uint256 nav)
        public
        returns(uint256)
    {
        for(uint256 i = 0; i < assetList.length; i++ ) {
            uint256 haveTokenUSD = IAPContract(APContract).getUSDPrice(assetList[i]);
            if((tokenBalances.getTokenBalance(assetList[i]).mul(haveTokenUSD)).div(1e18) > nav){
                uint256 amountToExchange = (nav.mul(1e18)).div(haveTokenUSD);
                (uint256 returnAmount, uint256[] memory distribution) = 
                IExchange(oneInch).getExpectedReturn(assetList[i], targetToken, amountToExchange, 0, 0);
                uint256 returnedTokenCount = IExchange(oneInch).swap(assetList[i], targetToken, amountToExchange, returnAmount, distribution, 0);
                return returnedTokenCount;
            }                
        }
        return 0;
    }


    /// @dev Function to exchange tokens to for a target token.
    /// @param targetToken Address of the target token.
    /// @param nav Nav to exchange.
    function swap(address targetToken, uint256 nav) 
        public 
        returns(uint256) 
    {
        uint256 exchangedAmount = exchangeToken(targetToken, nav);

        if(exchangedAmount > 0) {
            return exchangedAmount;
        } else {
            uint256 aquiredToken; uint256 currentNav; uint256 swappedAmount;

            for(uint256 i = 0; i < assetList.length; i++ ) {
                if(nav > currentNav) {
                    uint256 haveTokenUSD = IAPContract(APContract).getUSDPrice(assetList[i]);
                    uint256 haveTokenCount = tokenBalances.getTokenBalance(assetList[i]);
                    uint256 haveTokenNav = (haveTokenUSD.mul(haveTokenCount)).div(1e18);
                    if(haveTokenNav <= (nav-currentNav)) {
                        (uint256 returnAmount, uint256[] memory distribution) = IExchange(oneInch).getExpectedReturn(assetList[i], targetToken, haveTokenCount, 0, 0);
                        swappedAmount = IExchange(oneInch).swap(assetList[i], targetToken, returnAmount, haveTokenCount, distribution, 0);
                        aquiredToken += swappedAmount;
                        currentNav += haveTokenCount;
                    } else {
                        uint256 tokensToExchange = ((haveTokenNav - (nav-currentNav)).mul(1e18)).div(haveTokenUSD);
                        (uint256 returnAmount, uint256[] memory distribution) = IExchange(oneInch).getExpectedReturn(assetList[i], targetToken, tokensToExchange, 0, 0);
                        swappedAmount = IExchange(oneInch).swap(assetList[i], targetToken, returnAmount, tokensToExchange, distribution, 0);
                        aquiredToken += swappedAmount;
                        currentNav += haveTokenCount;
                    }
                }
                if(currentNav >= nav) return aquiredToken;
            }
            return 0;
        }
    }
}