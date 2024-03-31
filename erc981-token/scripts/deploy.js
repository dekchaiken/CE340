const hre = require("hardhat");

async function main() {
  const ERC721PartialOwnership = await hre.ethers.getContractFactory("ERC721PartialOwnership");
  const erc721PartialOwnership = await ERC721PartialOwnership.deploy("My ERC721 Token", "MET");

  await erc721PartialOwnership.deployed();

  console.log("ERC721PartialOwnership deployed to:", erc721PartialOwnership.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });