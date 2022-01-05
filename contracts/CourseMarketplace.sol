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

  address payable private owner;

  constructor() {
    setContractOwner(msg.sender);
  }

  /// Course has already a Owner!
  error CourseHasOwner();

 /// Only owner has an access!
  error OnlyOwner();

  modifier onlyOwner() {
    if (msg.sender != getContractOwner()) {
      revert OnlyOwner();
    }
    _;
  }

  function purchaseCourse(bytes16 courseId, bytes32 proof) external payable returns(bytes32) {
    bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));

    if (hasCourseOwnership(courseHash)) {
      revert CourseHasOwner();
    }

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


  function transferOwnership(address newOwner)
    external
    onlyOwner
  {
    setContractOwner(newOwner);
  }


  function getCourseCount() external view returns (uint) {
    return totalOwnedCourses;
  }


  function getCourseHashAtIndex(uint index)
    external
    view
    returns (bytes32)
  {
    return ownedCourseHash[index];
  }


  // if return struct need memory
  function getCourseByHash(bytes32 courseHash)
    external
    view
    returns (Course memory) 
  {
    return ownedCourses[courseHash];
  }


  function getContractOwner()
    public
    view
    returns (address)
  {
    return owner;
  }


  function setContractOwner(address newOwner) private {
    owner = payable(newOwner);
  }


  function hasCourseOwnership(bytes32 courseHash)
    private
    view
    returns (bool)
  {
    return ownedCourses[courseHash].owner == msg.sender;
  }
}