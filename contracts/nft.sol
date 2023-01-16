// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "./token.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract nft is ERC721URIStorage, Ownable {
    uint256 public price = 0.5 * 10 ** 10;
    ERC20 token;
    uint tokenId;

    constructor(address _token) ERC721("myNFT", "MNFT") {
        token = ERC20(_token);
    }

    function createNft(address to, string memory uri) public onlyOwner {
        require(tokenId < 3, "All three minted");
        require(
            token.balanceOf(msg.sender) >= price,
            "you dont have enough balance"
        );
        require(to != address(0), "Invalid input");

        _mint(to, tokenId);
        _setTokenURI(tokenId, uri);

        tokenId = tokenId + 1;
        token.transferFrom(msg.sender, address(this), price);
    }

    function getCurrentId() public view returns (uint) {
        return tokenId;
    }
}
