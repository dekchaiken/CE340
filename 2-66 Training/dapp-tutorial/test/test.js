const ERC721PartialOwnership = artifacts.require("ERC721PartialOwnership");

contract("ERC721PartialOwnership", (accounts) => {
  let erc721PartialOwnership;

  beforeEach(async () => {
    erc721PartialOwnership = await ERC721PartialOwnership.new(
      "TestToken",
      "TT"
    );
  });

  it("should mint a new token with partial ownership", async () => {
    const tokenId = await erc721PartialOwnership.mint(
      [
        "0xf0b60768436Ec05dA6C959F5E5Cf78F1A5169f18",
        "0x793303e187ED167745D45894D5AA3A5B6C501041",
      ], // ใส่ที่อยู่ของผู้ถือสิทธิ์เป็นตัวอย่าง
      [70, 30] // ใส่สิทธิ์ของแต่ละผู้ถือสิทธิ์เป็นตัวอย่าง
    );
    console.log("Token ID: ", tokenId);
    assert.exists(tokenId, "Token ID should exist");
  });
});
