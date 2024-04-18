// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @title ERC981PartialOwnership
 * @dev Implementation of the ERC-981 Partial Ownership Standard
 */
contract ERC981PartialOwnership {
    // Mapping to store ownership data
    mapping(uint256 => mapping(uint256 => address[])) private _owners;
    mapping(uint256 => mapping(uint256 => mapping(address => uint256))) private _balances;

    // ERC721 token contract address
    ERC721 private _erc721Token;

    constructor(address erc721TokenAddress) {
        _erc721Token = ERC721(erc721TokenAddress);
    }

    /**
     * @dev Returns the list of owners for the given asset at the specified time.
     * @param assetId The ID of the asset.
     * @param timeTag The time to query the ownership data for.
     * @return A list of addresses representing the owners.
     */
    function ownerOf(uint256 assetId, uint256 timeTag) external view returns (address[] memory) {
        return _owners[assetId][timeTag];
    }

    /**
     * @dev Transfers ownership of the given asset by updating the ownership data.
     * @param assetId The ID of the asset to transfer ownership for.
     * @param callees The list of addresses to transfer ownership to.
     * @param timeTaggedValues The list of ownership fractions to transfer, each associated with a time tag.
     */
    function transfer(uint256 assetId, address[] calldata callees, uint256[] calldata timeTaggedValues) external {
        require(callees.length == timeTaggedValues.length, "Invalid input lengths");
        require(_erc721Token.ownerOf(assetId) == msg.sender, "Not the owner of the asset");

        uint256 totalTransferredValue = 0;
        for (uint256 i = 0; i < timeTaggedValues.length; i++) {
            _balances[assetId][timeTaggedValues[i]][callees[i]] += timeTaggedValues[i];
            _owners[assetId][timeTaggedValues[i]].push(callees[i]);
            totalTransferredValue += timeTaggedValues[i];
        }

        require(totalTransferredValue <= 1e18, "Total transferred value exceeds 100%");

        emit Transfer(assetId, msg.sender, callees, timeTaggedValues);
    }

    /**
     * @dev Transfers ownership of multiple assets in a batch operation.
     * @param assetIds The list of asset IDs to transfer ownership for.
     * @param callees The list of addresses to transfer ownership to.
     * @param timeTaggedValues The list of ownership fractions to transfer, each associated with a time tag.
     */
    function transferBatch(uint256[] calldata assetIds, address[] calldata callees, uint256[] calldata timeTaggedValues) external {
        require(assetIds.length == callees.length && callees.length == timeTaggedValues.length, "Invalid input lengths");


        emit TransferBatch(assetIds, msg.sender, callees, timeTaggedValues);
    }

    /**
     * @dev Returns the ownership fraction of the given owner for the specified asset at the given time.
     * @param assetId The ID of the asset.
     * @param owner The address of the owner.
     * @param timeTag The time to query the ownership data for.
     * @return The ownership fraction of the given owner.
     */
    function balanceOf(uint256 assetId, address owner, uint256 timeTag) external view returns (uint256) {
        return _balances[assetId][timeTag][owner];
    }

    /**
     * @dev Returns the ownership fractions of multiple owners for multiple assets in a batch operation.
     * @param assetIds The list of asset IDs.
     * @param owners The list of owner addresses.
     * @param timeTags The list of time tags to query the ownership data for.
     * @return The list of ownership fractions for the corresponding asset-owner-time combinations.
     */
    function balanceOfBatch(uint256[] calldata assetIds, address[] calldata owners, uint256[] calldata timeTags) external view returns (uint256[] memory) {
        require(assetIds.length == owners.length && owners.length == timeTags.length, "Invalid input lengths");

        uint256[] memory balances = new uint256[](assetIds.length);
        for (uint256 i = 0; i < assetIds.length; i++) {
            balances[i] = _balances[assetIds[i]][timeTags[i]][owners[i]];
        }

        return balances;
    }

    event Transfer(uint256 indexed assetId, address indexed from, address[] callees, uint256[] timeTaggedValues);
    event TransferBatch(uint256[] assetIds, address indexed from, address[] callees, uint256[] timeTaggedValues);
}