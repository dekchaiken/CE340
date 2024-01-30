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
}