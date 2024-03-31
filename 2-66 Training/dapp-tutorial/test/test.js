const ERC721PartialOwnership = artifacts.require("ERC721PartialOwnership");

contract("ERC721PartialOwnership", accounts => {
  it("should mint a new token with partial ownership", async () => {
    const contractInstance = await ERC721PartialOwnership.deployed();
    const owners = [accounts[0], accounts[1]]; // 2 addresses
    const shares = [web3.utils.toBN(50), web3.utils.toBN(50)]; // Assuming shares are 50 each
    
    // Mint a new token with partial ownership
    const tokenId = await contractInstance.mint(owners, shares);
    
    // Check ownership
    const [tokenOwners, ownerShares] = await contractInstance.ownershipOf(tokenId);
    assert.strictEqual(tokenOwners.length, 2, "Incorrect number of owners");
    assert.strictEqual(tokenOwners[0], owners[0], "Incorrect owner address");
    assert.strictEqual(tokenOwners[1], owners[1], "Incorrect owner address");
    assert.strictEqual(ownerShares.length, 2, "Incorrect number of shares");
    assert.strictEqual(ownerShares[0], shares[0], "Incorrect share");
    assert.strictEqual(ownerShares[1], shares[1], "Incorrect share");
  });
});
