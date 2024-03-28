const hre = require("hardhat");

async function main() {
  const ERC981Token = await hre.ethers.getContractFactory("ERC981Token");
  const erc981Token = await ERC981Token.deploy("My ERC981 Token", "MET");

  await erc981Token.deployed();

  console.log("ERC981Token deployed to:", erc981Token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });