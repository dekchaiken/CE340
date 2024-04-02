const ERC981Token = artifacts.require("ERC981Token");

module.exports = function (deployer) {
  deployer.deploy(ERC981Token, "ERC981 Token", "ERC981");
};