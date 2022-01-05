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

  // mapping of courseHash to Course data
  mapping(bytes32 => Course) private ownedCourses;

  // mapping of courseID to courseHash
  mapping(uint => bytes32) private ownedCourseHash;

  // number of all courses + id of the course
  uint private totalOwnedCourses;

  function purchaseCourse(bytes16 courseId, bytes32 proof) external payable returns(bytes32) {
    bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));
    uint id = totalOwnedCourses++;
    ownedCourseHash[id] = courseHash;
    ownedCourses[courseHash] = Course({
      id: id,
      price: msg.value,
      proof: proof,
      owner: msg.sender,
      state: State.Purchased
    });
    return courseHash;
  }
}