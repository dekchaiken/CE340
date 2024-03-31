// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title ERC721PartialOwnership
 * @dev Implementation of the ERC981 standard for partial ownership of ERC721 tokens.
 */
contract ERC721PartialOwnership is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // Mapping from token ID to list of owners and their shares
    mapping(uint256 => Ownership) private ownershipByToken;

    // Struct to represent ownership of a token
    struct Ownership {
        address[] owners;
        uint256[] shares;
    }

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    /**
     * @dev Mints a new ERC721 token and assigns partial ownership.
     * @param owners The addresses of the initial owners.
     * @param shares The shares of ownership for each owner.
     */
    function mint(address[] memory owners, uint256[] memory shares) public returns (uint256) {
        require(owners.length == shares.length, "Owners and shares arrays must have the same length");
        require(owners.length > 0, "At least one owner is required");
        uint256 totalShares = 0;
        for (uint256 i = 0; i < shares.length; i++) {
            totalShares += shares[i];
        }
        require(totalShares == 100, "Total shares must be 100");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        ownershipByToken[tokenId] = Ownership(owners, shares);
        emit Transfer(address(0), msg.sender, tokenId);
        return tokenId;
    }

    /**
     * @dev Gets the list of owners and their shares for a given token.
     * @param tokenId The token ID to query.
     * @return owners The list of owners.
     * @return shares The shares of ownership for each owner.
     */
    function ownershipOf(uint256 tokenId) public view returns (address[] memory owners, uint256[] memory shares) {
        Ownership storage ownership = ownershipByToken[tokenId];
        return (ownership.owners, ownership.shares);
    }

    /**
     * @dev Transfers partial ownership of a token to new addresses.
     * @param tokenId The token ID to transfer ownership of.
     * @param newOwners The addresses of the new owners.
     * @param newShares The shares of ownership for the new owners.
     */
    function transferOwnership(
        uint256 tokenId,
        address[] memory newOwners,
        uint256[] memory newShares
    ) public {
        require(ownershipByToken[tokenId].owners.length > 0, "Token does not exist");
        require(newOwners.length == newShares.length, "Owners and shares arrays must have the same length");
        require(newOwners.length > 0, "At least one new owner is required");
        uint256 totalShares = 0;
        for (uint256 i = 0; i < newShares.length; i++) {
            totalShares += newShares[i];
        }
        require(totalShares == 100, "Total shares must be 100");

        Ownership storage ownership = ownershipByToken[tokenId];
        ownership.owners = newOwners;
        ownership.shares = newShares;
        emit Transfer(msg.sender, address(0), tokenId);
    }
}