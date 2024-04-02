// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Petshop {    // ชื่อคลาส

  uint public petCount; // เก็บจำนวนสัตว์เลี้ยง
  struct PetInfo {       // ข้อมูลสัตว์เลี้ยงที่ขาย
    uint price;         // ราคา
    address buyer;      // Address ของผู้ซื้อ ( default คือ address(0) )
  }
  PetInfo [] public petInfos; // ตัวแปรชุดชนิด PetInfo ที่เก็บข้อมูลสัตว์เลี้ยงที่ขาย
  address payable public owner; // เก็บ Address ของเจ้าของร้าน
  constructor(uint [] memory petPrices)  {
    owner = payable(msg.sender);       // กำหนด Address ของผู้สร้าง contract ให้เป็นเจ้าของร้าน
    for(uint i = 0; i < petPrices.length; i++) {
      PetInfo memory petInfo = PetInfo(petPrices[i] * 1 ether, address(0)); // สร้าง Record สัตว์เลี้ยงที่ขายพร้อมใส่ราคา
      petInfos.push(petInfo); // เอา Record ใหม่ ใส่ไปในตัวแปรชุด petInfos
  }
  petCount = petPrices.length; // กำหนดจำนวนสัตว์เลี้ยงที่จะขายจากขนาดของตัวแปรชุดของราคา petPrices
  }

  modifier onlyOwner() { // ตรวจสอบว่าผู้เรียกเป็นเจ้าของร้านหรือไม่
    require(msg.sender == owner, "Only owner can call this function");
    _;
  }
  // เรียกดูราคาของสัตว์เลี้ยงที่ขายจาก Id
  function getPrice(uint petId) public view returns(uint) {
    return petInfos[petId].price;
  }
  // เรียกดูผู้ซื้อของสัตว์เลี้ยงที่ขายจาก Id
  function getBuyer(uint petId) public view returns(address) {
    return petInfos[petId].buyer;
  }
  // เรียกดูยอดเงินในสัญญา
  function getBalance() public view onlyOwner returns(uint) {
    return address(this).balance;
  }
  // เรียกดู record ของสัตว์เลี้ยง (address, price)
  function getInfo(uint petId) public view returns(address, uint) {
    return (petInfos[petId].buyer, petInfos[petId].price);
  }
  // เรียกดูจำนวนสัตว์เลีี้ยงทั้งหมด 
  function getTotalPets() public view returns(uint) {
    return petInfos.length;
  }
  // ซื้อสัตว์เลี้ยงที่ชี้โดย pet Id
  function buy(uint pedId) public payable {   // payable คือฟังก์ชันที่สามารถรับเงิน / ส่งเงินเข้าไป ไม่ใช้กับถอนเงิน
    require(msg.sender != owner, "Shop owner cannot buy pet");            // ตรวจสอบว่าเจ้าของร้านไม่สามารถซื้อสัตว์เลี้ยงได้
    require(pedId >= 0 && pedId < petInfos.length, "Invalid pet id");   // ตรวจสอบว่ามีเงินเพียงพอและ Id สัตว์เลี้ยงถูกต้อง
    require(msg.value >= petInfos[pedId].price, "Insufficient funds");   // ตรวจสอบว่ามีเงินเพียงพอ
    require(petInfos[pedId].buyer == address(0), "This one is sold");   // ตรวจสอบว่าสัตว์เลี้ยงนี้ยังไม่ถูกซื้อ
    petInfos[pedId].buyer = msg.sender;       // บันทึก address ของผู้ซื้อในข้อมูลสัตว์เลี้ยง
    emit Sold(pedId, msg.sender, petInfos[pedId].price, block.timestamp); // ส่ง Event บันทึกข้อมูลการซื้อสัตว์เลี้ยง
  }
  // สร้าง Event สำหรับบันทึกข้อมูลการซื้อสัตว์เลี้ยง
  event Sold(uint pedId, address buyer, uint price, uint timestamp);
  // ถอนเงินจากสัญญา
  function withdraw(uint amount) public onlyOwner {
    require(address(this).balance > amount, "Insufficient funds"); // ตรวจสอบว่ามีเงินเพียงพอ
    owner.transfer(amount);         // ทำการโอนเงิน
    emit Withdrawn(amount, block.timestamp); // ส่ง Event แจ้งให้ทราบว่ามีการโอนเงิน
  }
  // event แจ้งให้ทราบว่ามีการถอนเงิน
  event Withdrawn(uint amount, uint timestamp);

}
