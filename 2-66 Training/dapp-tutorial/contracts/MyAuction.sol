// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Auction.sol";

contract MyAuction is Auction {

  // State Variables
  uint public auctionStart; // เวลาที่สัญญาเริ่มทำงาน
  uint public auctionEnd; // เวลาที่สัญญาสิ้นสุด (ปกติ | ยกเลิก)
  uint public highestBid; // ยอดประมูลสูงสุด ณ ปัจจุบัน
  address public highestBidder; // บัญชีผู้ประมูลสูงสุด ณ ปัจจุบัน
  uint public withdrawEnd;  // เวลาที่สิ้นสุดการถอนเงิน
  Product public myProduct; // Record ที่เก็บข้อมูลสินค้า ที่ถูกประมูล
  mapping (address => uint256) public bids; // ตาราง bids เก็บข้อมูลผู้ประมูลและยอดเงินของแต่ละคน
  address [] bidders; // เก็บ Address ของผู้ประมูลทั้งหมด
  AuctionState public STATE; // สถานะปัจจุบันของสัญญา
  constructor(string memory _brand, string memory _serial, uint _durationInMinutes) {
    // เจ้าของคือผู้ที่สร้าง Smart Contract
    owner = payable(msg.sender);
    auctionStart = block.timestamp;
    auctionEnd = block.timestamp + _durationInMinutes * 1 minutes;  // เวลาปัจจุบัน + ระยะเวลาของการประมูล
    myProduct = Product(_brand, _serial); // สร้าง Record เพื่อเก็บข้อมูลสินค้า
    STATE = AuctionState.STARTED; // เริ่มการประมูล
  }

  /**
   * ! เงื่อนไขการทำงานของ Function
   * 1. ฟังก์ชั่นเฉพาะเจ้าของเท่านั้น
   * 2. ฟังก์ชั่นเฉพาะผู้ประมูลเท่านั้น
   * 3. ฟังก์ชั่นเรียกใช้ได้เฉพาะบางสถานะของการประมูล
   */

  // Function ที่คล้ายกันและเรียกใช้งานบ่อย สามารถสร้างเป็น Modifier ได้
  modifier onlyOwner {
    require(msg.sender == owner, "Only owner can call this function");
    _;  // คำสั่งที่ใช้เพื่อเรียกใช้งานฟังก์ชั่นที่ถูกเรียก
  }

  modifier notAnOwner {
    require(msg.sender != owner, "Only bidder can call this function");
    _;
  }

  modifier anOngoingAuction {
    require(STATE == AuctionState.STARTED, "Invalid auction state");
    _;
  }

  // ยื่นประมูล | เสนอราคา พร้อมส่งเงินประมูลมาเก็บไว้
  function bid() override public payable notAnOwner anOngoingAuction {  // Override คือการเขียนทับ
    require(msg.sender != highestBidder, "Already a current highest bidder"); // ต้องไม่ใช่ผู้ประมูลสูงสุด
    require(msg.value + bids[msg.sender] > highestBid, "Can not bid, make a higher bid");
    highestBidder = msg.sender;
    if (bids[msg.sender] == 0) {  // เช็คยอดเงินในตารางถ้าเป็น 0 ให้เพิ่ม Address ของผู้ประมูลใหม่
      bidders.push(msg.sender);
    }
    bids[msg.sender] += msg.value; // อัพเดทยอดเงินในตาราง
    highestBid = bids[msg.sender]; // อัพเดทยอดเงินประมูลสูงสุด

    emit BidEvent(msg.sender, msg.value, block.timestamp); // ส่ง Event แจ้งเตือนว่ามีการประมูลเข้ามา
  }
  /**
   * ! การถอนเงิน
   * การทำงานมีอยู่ 2 กรณี
   * 1.กรณีผู้ประมูลสูงสุด
   * 2.กรณีของเจ้าของ
   * 3.กรณีผู้ไม่ชนะการประมูล
   */
  function withdraw() override external {
    uint256 amount;
    address deletingBidder;
    if (msg.sender == highestBidder) {
      require(STATE == AuctionState.CANCELLED, "You are the highest bidder, can not withdraw");
      amount = bids[msg.sender];  // เก็บจำนวนเงินที่จะถอน
      // delete bids[msg.sender];  // ลบข้อมูลผู้ประมูล
      deletingBidder = msg.sender;  // เก็บ Address ของผู้ประมูลที่จะถอน
    } else if (msg.sender == owner) {
      require(STATE == AuctionState.ENDED, "Owner has no withdrawable balance");
      amount = highestBid;
      // delete bids[highestBidder]; // ลบข้อมูลผู้ประมูลสูงสุด
      deletingBidder = highestBidder; // เก็บ Address ของผู้ประมูลสูงสุด
    } else {
      require(bids[msg.sender] > 0, "You have no balance to withdraw"); // เช็คว่าเป็นผู้ประมูลหรือไม่
      require(STATE == AuctionState.ENDED || STATE == AuctionState.CANCELLED, "Can not withdraw at this moment");
      amount = bids[msg.sender];
      // delete bids[msg.sender];
      deletingBidder = msg.sender;
    }

    if (deletingBidder != address(0)) {
      for (uint i = 0; i < bidders.length; i++) {
        if (bidders[i] == deletingBidder) {
          delete bidders[i];  // ลบ Address ของผู้ประมูลใน Array ที่เก็บ Address ของผู้ประมูลทั้งหมด
          delete bids[deletingBidder];  // ลบข้อมูลผู้ประมูลในตาราง
          break;
        }
      }
    }

    // โอนเงิน
    payable(msg.sender).transfer(amount); // สั่งโอนเงิน
    emit WithdrawEvent(msg.sender, amount, block.timestamp);

  } // external คือการเรียกใช้งานจากภายนอก
  // จบการประมูล
  function endAuction() override external {
    require(block.timestamp > auctionEnd, "Can not end at this moment");
    STATE = AuctionState.ENDED;
    withdrawEnd = block.timestamp + 7 days;
    emit EndedEvent("This auction is over", block.timestamp);
  }
  // ยกเลิกการประมูล
  function cancelAuction() override external onlyOwner{
    STATE = AuctionState.CANCELLED;
    withdrawEnd = block.timestamp + 7 days;
    emit EndedEvent("This auction is cancelled", block.timestamp);
  }
  // เช็ครายละเอียดสินค้า
  function getProductInfo() override external view returns (string memory, string memory) {
    return (myProduct.Brand, myProduct.SerialNumber);
  }
  // เช็คราคาที่เราเสนอ
  function getMyBid(address bidder) override external view returns (uint256) {
    return bids[bidder];
  }
  // เช็คราคาที่เสนอสูงสุด
  function getHighestBid() override external view returns (uint256) {
    return highestBid;
  }
}
