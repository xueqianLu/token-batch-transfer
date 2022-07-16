// contracts/MyToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    uint256 public constant INITIAL_SUPPLY = 10000000000000000000000000000000;
    constructor() ERC20("MyTokenM", "MMM") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
    function mint(uint256 mintSuplly) public {
        _mint(msg.sender, mintSuplly);
    }
}
