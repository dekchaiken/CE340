const ERC721PartialOwnership = artifacts.require("ERC721PartialOwnership");

module.exports = function(deployer) {
  deployer.deploy(ERC721PartialOwnership, "PartialOwnership", "PARTOWND");
};