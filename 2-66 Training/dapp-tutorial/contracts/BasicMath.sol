// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract BasicMath {
  function add(uint x, uint y) pure public returns (uint) {
    return x + y;
  }
  function subtract(uint x, uint y) pure public returns (uint) {
    return x - y;
  }
  function multiply(uint x, uint y) pure public returns (uint) {
    return x * y;
  }
  function divide(uint x, uint y) pure public returns (uint) {
    return x / y;
  }
  function sum(uint x, uint y, uint z) pure public returns (uint) {
    return x + y + z;
  }
  function average(uint x, uint y, uint z) pure public returns (uint) {
    return (x + y + z) / 3;
  }
}