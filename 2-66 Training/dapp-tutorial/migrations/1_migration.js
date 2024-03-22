const MyAuction = artifacts.require("MyAuction");
const product = require('./product.json'); // Assuming product.json exists

module.exports = async function(deployer) {
  await deployer.deploy(MyAuction, product.Brand, product.SerialNumber, product.Period);
};
