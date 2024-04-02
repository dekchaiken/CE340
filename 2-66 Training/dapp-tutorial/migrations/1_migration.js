// const MyAuction = artifacts.require("MyAuction");
const Petshop = artifacts.require("Petshop");
// const product = require('./product.json'); // Assuming product.json exists

const petPrices = require('./petPrices.json'); // Assuming petPrices.json exists
module.exports = async function(deployer) {
  deployer.deploy(Petshop, petPrices);
  // await deployer.deploy(MyAuction, product.Brand, product.SerialNumber, product.Period);
};
