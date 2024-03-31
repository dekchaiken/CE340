async function main() {
    const { expect } = await import("chai");
  
    describe("ERC981Token", function () {
  let ERC721PartialOwnership, erc721PartialOwnership, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    ERC721PartialOwnership = await ethers.getContractFactory("ERC721PartialOwnership");
    erc721PartialOwnership = await ERC721PartialOwnership.deploy("My ERC721 Token", "MET");
    await erc721PartialOwnership.deployed();
  });

  it("should mint a new token with owners and shares", async function () {
    const owners = [owner.address, addr1.address];
    const shares = [60, 40];

    const tokenId = await erc721PartialOwnership.mint(owners, shares);

    const ownershipData = await erc721PartialOwnership.ownershipOf(tokenId);
    expect(ownershipData.owners).to.deep.equal(owners);
    expect(ownershipData.shares).to.deep.equal(shares);

    // Accessing the balance of addr1 and addr2
    const balanceOfAddr1 = await erc721PartialOwnership.balanceOf(addr1.address);
    const balanceOfAddr2 = await erc721PartialOwnership.balanceOf(addr2.address);

    // Assert the balance of addr1 and addr2
    expect(balanceOfAddr1).to.equal(1); // Assuming each address only holds one token
    expect(balanceOfAddr2).to.equal(0); // Assuming addr2 doesn't hold any token yet
});

it("should transfer ownership to new owners and shares", async function () {
    const owners = [owner.address, addr1.address];
    const shares = [60, 40];

    const tokenId = await erc721PartialOwnership.mint(owners, shares);

    const newOwners = [addr1.address, addr2.address];
    const newShares = [70, 30];

    await erc721PartialOwnership.transferOwnership(tokenId, newOwners, newShares);

    const ownershipData = await erc721PartialOwnership.ownershipOf(tokenId);
    expect(ownershipData.owners).to.deep.equal(newOwners);
    expect(ownershipData.shares).to.deep.equal(newShares);

    // Accessing the balance of addr1 and addr2 after transfer
    const balanceOfAddr1 = await erc721PartialOwnership.balanceOf(addr1.address);
    const balanceOfAddr2 = await erc721PartialOwnership.balanceOf(addr2.address);

    // Assert the balance of addr1 and addr2 after transfer
    expect(balanceOfAddr1).to.equal(1); // Assuming each address only holds one token
    expect(balanceOfAddr2).to.equal(0); // Assuming addr2 doesn't hold any token yet
});
})};