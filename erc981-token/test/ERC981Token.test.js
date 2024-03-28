async function main() {
    const { expect } = await import("chai");
  
    describe("ERC981Token", function () {
  let ERC981Token, erc981Token, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    ERC981Token = await ethers.getContractFactory("ERC981Token");
    erc981Token = await ERC981Token.deploy("My ERC981 Token", "MET");
    await erc981Token.deployed();
  });

  it("should mint a new token with owners and shares", async function () {
    const owners = [owner.address, addr1.address];
    const shares = [60, 40];

    const tokenId = await erc981Token.mint(owners, shares);  //ใช้สำหรับการสร้างโทเค็น ERC-981 ใหม่
    // ฟังก์ชัน mint จะสร้างโทเค็น ERC-981 ใหม่และส่งคืนค่า tokenId ของโทเค็นใหม่
    
    // ownershipData 
    // คือข้อมูลเกี่ยวกับการถือครองของโทเค็น ERC-981 ที่มีค่าเป็นอาร์เรย์ของที่อยู่ของเจ้าของและอาร์เรย์ของสัดส่วนของเจ้าของ
    const ownershipData = await erc981Token.ownershipOf(tokenId);
    // ต้องระบุ Token ID ของโทเค็นที่ต้องการดู
    // ฟังก์ชันจะส่งคืนรายการ owners และ shares สำหรับโทเค็นนั้น
    expect(ownershipData.owners).to.deep.equal(owners);
    expect(ownershipData.shares).to.deep.equal(shares);
  });

  it("should transfer ownership to new owners and shares", async function () {
    const owners = [owner.address, addr1.address];
    const shares = [60, 40];

    const tokenId = await erc981Token.mint(owners, shares);

    const newOwners = [addr1.address, addr2.address];
    const newShares = [70, 30];

    // ฟังก์ชัน transferOwnership จะโอนสิทธิ์ให้กับเจ้าของใหม่และสัดส่วนใหม่
    // ต้องระบุ Token ID, รายชื่อผู้เป็นเจ้าของใหม่ (newOwners) และสัดส่วนการถือครองใหม่ (newShares)
    await erc981Token.transferOwnership(tokenId, newOwners, newShares);

    const ownershipData = await erc981Token.ownershipOf(tokenId);
    expect(ownershipData.owners).to.deep.equal(newOwners);
    expect(ownershipData.shares).to.deep.equal(newShares);
  });
})};