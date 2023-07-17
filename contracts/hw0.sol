// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";


contract hw0 is OwnableUpgradeable {

    bool public opening;
    mapping(address => bool) public solved1;
    mapping(address => bool) public solved2;
    bytes32[] public hashes;
    bytes32 root;

    uint256 private myVar;

    /**Test contract interaction */
    function setMyVar(uint256 value) public {
        myVar = value;
    }

    function getMyVar() public view returns (uint256) {
        return myVar;
    }

    /**Problem 1: Basic Transaction */

    fallback() external payable {
        if (msg.value == 0.001 ether) {
            require(opening, "Exceed the Deadline!");
            solved1[msg.sender] = true;
        }
    }

    /**Problem 2: Merkle Proof */

    function merkleProof(bytes32[] memory proof) public {
        require(opening, "Exceed the Deadline!");
        bytes32 leaf = keccak256(abi.encodePacked("zkplayground"));
        require(verify(proof, root, leaf), "Your proof is incorrect!");
        solved2[msg.sender] = true;
    }

    function verify(
        bytes32[] memory proof,
        bytes32 root,
        bytes32 leaf
    ) public pure returns (bool){
        // mock verify function
        return true;
    }

    function _hashPair(bytes32 a, bytes32 b) public pure returns (bytes32) {
        return a < b ? _efficientHash(a, b) : _efficientHash(b, a);
    }

    function _efficientHash(bytes32 a, bytes32 b)
    private
    pure
    returns (bytes32 value)
    {
        assembly {
            mstore(0x00, a)
            mstore(0x20, b)
            value := keccak256(0x00, 0x40)
        }
    }
}