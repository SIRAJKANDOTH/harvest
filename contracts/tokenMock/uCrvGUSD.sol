pragma solidity >=0.5.0 <0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract uCrvGUSD is ERC20, ERC20Detailed {
    constructor() public ERC20Detailed("uCrvGUSD", "uCrvGUSD Token", 18) {
        _mint(msg.sender, 1e18 * 1e18);
    }
}