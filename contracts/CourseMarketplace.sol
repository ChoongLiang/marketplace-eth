// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CourseMarketplace{
  enum State {
    Purchased,
    Activated,
    Deactivated
  }

  // always try to organize your data to 32 bytes
  struct Course {
    uint id; // 32 - 1st slot
    uint price; // 32 - 2nd slot
    bytes32 proof; // 32 - 3rd slot
    address owner;// 20 - 4th slot
    State state; // 1 - 4th slot
  }
}