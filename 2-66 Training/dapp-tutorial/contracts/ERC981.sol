// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ERC981Token is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    struct Ownership {
        address[] owners;
        uint256[] shares;
    }

    mapping(uint256 => Ownership) private _ownerships;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mint(address[] memory owners, uint256[] memory shares) public returns (uint256) {
        require(owners.length == shares.length, "Owners and shares must have the same length");
        uint256 totalShares = 0;
        for (uint256 i = 0; i < shares.length; i++) {
            totalShares += shares[i];
        }
        require(totalShares == 100, "Total shares must be 100");

        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(owners[0], tokenId);

        _ownerships[tokenId] = Ownership(owners, shares);

        return tokenId;
    }

    function ownershipOf(uint256 tokenId) public view returns (address[] memory, uint256[] memory) {
        Ownership storage ownership = _ownerships[tokenId];
        return (ownership.owners, ownership.shares);
    }

    function transferOwnership(uint256 tokenId, address[] memory newOwners, uint256[] memory newShares) public {
        require(newOwners.length == newShares.length, "New owners and shares must have the same length");
        uint256 totalShares = 0;
        for (uint256 i = 0; i < newShares.length; i++) {
            totalShares += newShares[i];
        }
        require(totalShares == 100, "Total new shares must be 100");

        Ownership storage ownership = _ownerships[tokenId];
        ownership.owners = newOwners;
        ownership.shares = newShares;
    }
    function shareOwnership(uint256 tokenId, address[] memory newOwners, uint256[] memory newShares) public {
    require(newOwners.length == newShares.length, "New owners and shares must have the same length");
    uint256 totalShares = 0;
    for (uint256 i = 0; i < newShares.length; i++) {
        totalShares += newShares[i];
    }
    require(totalShares == 100, "Total new shares must be 100");

    Ownership storage ownership = _ownerships[tokenId];
    ownership.owners = newOwners;
    ownership.shares = newShares;
}
}