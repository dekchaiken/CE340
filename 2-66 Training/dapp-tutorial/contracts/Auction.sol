// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

abstract contract Auction { // abstract คือการประกาศให้เป็น Abstract Class หรือ Interface เพื่อให้สามารถเรียกใช้งานได้
  // Address เจ้าของ
  address payable public owner;

  // กำหนดค่าสถานะที่เป็นไปได้ในการประมูล
  enum AuctionState { STARTED, ENDED, CANCELLED, DESTRUCTED }

  struct Product {
    string Brand;
    string SerialNumber;
  }

  // ยื่นประมูล | เสนอราคา พร้อมส่งเงินประมูลมาเก็บไว้
  function bid() virtual public payable;  // virtual คือการเปิดให้มีการ Override ได้
  // ถอนเงิน
  function withdraw() virtual external; // external คือการเรียกใช้งานจากภายนอก
  // จบการประมูล
  function endAuction() virtual external;
  // ยกเลิกการประมูล
  function cancelAuction() virtual external;
  // เช็ครายละเอียดสินค้า
  function getProductInfo() virtual external view returns (string memory, string memory);
  // เช็คราคาที่เราเสนอ
  function getMyBid(address bidder) virtual external view returns (uint256);
  // เช็คราคาที่เสนอสูงสุด
  function getHighestBid() virtual external view returns (uint256);

  // สร้าง Event สำหรับการประมูล
  event BidEvent(address bidder, uint256 amount, uint256 timestamp);
  // แจ้งเตือนเมื่อการประมูลจบลง
  event EndedEvent(string message, uint256 timestamp);
  // แจ้งเตือนเมื่อการประมูลถูกยกเลิก
  event CancelledEvent(string message, uint256 timestamp);
  // แจ้งเตือนเมื่อมีการถอนเงิน
  event WithdrawEvent(address bidder, uint256 amount, uint256 timestamp);
}
