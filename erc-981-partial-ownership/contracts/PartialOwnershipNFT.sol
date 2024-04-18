// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Mintable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PartialOwnershipNFT is ERC721, ERC721Mintable, ERC721Royalty, Ownable {
    struct OwnershipInfo {
        address owner;
        uint256 percentage;
    }

    mapping(uint256 => OwnershipInfo[]) public ownershipInfos;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mint(uint256 tokenId, OwnershipInfo[] memory owners) public onlyOwner {
        _mintWithRoyalties(msg.sender, tokenId, owners[0].percentage);
        for (uint256 i = 0; i < owners.length; i++) {
            ownershipInfos[tokenId].push(owners[i]);
        }
    }

    function getOwnershipInfo(uint256 tokenId) public view returns (OwnershipInfo[] memory) {
        return ownershipInfos[tokenId];
    }

    function transferOwnership(uint256 tokenId, address to, uint256 percentage) public {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        require(percentage > 0 && percentage <= 100, "Invalid percentage");

        OwnershipInfo[] storage owners = ownershipInfos[tokenId];
        uint256 totalPercentage;
        for (uint256 i = 0; i < owners.length; i++) {
            if (owners[i].owner == _msgSender()) {
                require(owners[i].percentage >= percentage, "Insufficient ownership percentage");
                owners[i].percentage -= percentage;
            }
            totalPercentage += owners[i].percentage;
        }

        require(totalPercentage + percentage <= 100, "Total percentage exceeded 100%");

        ownershipInfos[tokenId].push(OwnershipInfo(to, percentage));
    }

    function _transferRoyalties(uint256 tokenId, address newOwner, uint256 percentage) internal override {
        OwnershipInfo[] storage owners = ownershipInfos[tokenId];
        for (uint256 i = 0; i < owners.length; i++) {
            if (owners[i].owner == newOwner) {
                owners[i].percentage += percentage;
                return;
            }
        }
        ownershipInfos[tokenId].push(OwnershipInfo(newOwner, percentage));
    }
}