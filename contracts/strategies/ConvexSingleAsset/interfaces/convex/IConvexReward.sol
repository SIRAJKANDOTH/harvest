pragma solidity >=0.5.0;

interface IConvexReward{
    function withdraw(uint256 _amount, bool _claim) external;
    
}