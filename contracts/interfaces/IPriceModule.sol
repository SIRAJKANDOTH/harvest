// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.7.0;
pragma experimental ABIEncoderV2;

interface IPriceModule
{
    function setFeedAddress (address , address ) external;
    function getUSDPrice(address ) external view returns(int, uint, uint8);
}