// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ERC981Token is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    struct Ownership {
        address[] owners;
        uint256[] shares;
    }

    mapping(uint256 => Ownership) private ownershipByToken;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {} // This constructor sets the token's name and symbol.


    function mint(address[] memory owners, uint256[] memory shares) public returns (uint256) {
        require(owners.length == shares.length, "Owners and shares arrays must have the same length");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);

        ownershipByToken[tokenId] = Ownership(owners, shares);

        emit Transfer(address(0), msg.sender, tokenId);

        return tokenId;
    }

    function ownershipOf(uint256 tokenId) public view returns (address[] memory owners, uint256[] memory shares) {
        Ownership storage ownership = ownershipByToken[tokenId];
        return (ownership.owners, ownership.shares);
    }

    function transferOwnership(uint256 tokenId, address[] memory newOwners, uint256[] memory newShares) public {
        require(ownershipByToken[tokenId].owners.length > 0, "Token does not exist");
        require(newOwners.length == newShares.length, "Owners and shares arrays must have the same length");

        Ownership storage ownership = ownershipByToken[tokenId];
        ownership.owners = newOwners;
        ownership.shares = newShares;

        emit Transfer(msg.sender, address(0), tokenId);
    }

    function getOwnership(uint256 tokenId) public view returns (address[] memory, uint256[] memory) {
    Ownership storage ownership = ownershipByToken[tokenId];
    return (ownership.owners, ownership.shares);
    }
}