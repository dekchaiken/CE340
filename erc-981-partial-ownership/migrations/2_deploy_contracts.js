const PartialOwnershipNFT = artifacts.require("PartialOwnershipNFT");

module.exports = function (deployer) {
  deployer.deploy(PartialOwnershipNFT);
};