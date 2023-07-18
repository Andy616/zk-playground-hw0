// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract hw0 is OwnableUpgradeable {
    mapping(address => bool) public solved1;
    mapping(address => bool) public solved2;
    bytes32[] public hashes;
    bytes32 public root;
    bytes32 public proofRoot;

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
            solved1[msg.sender] = true;
        }
    }

    /**Problem 2: Merkle Proof */

    function merkleProof(bytes32[] memory proof) public {
        bytes32 leaf = keccak256(abi.encodePacked("zkplayground"));
        require(verifyV0(proof, root, leaf), "Your proof is incorrect!");
        solved2[msg.sender] = true;
    }

    function verifyV0(
        bytes32[] memory proof,
        bytes32 root,
        bytes32 leaf
    ) public returns (bool) {
        bytes32 l11 = keccak256(abi.encodePacked(leaf, proof[0]));
        bytes32 l21 = keccak256(abi.encodePacked(l11, proof[1]));
        bytes32 l31 = keccak256(abi.encodePacked(l21, proof[2]));
        bytes32 _proofRoot = keccak256(abi.encodePacked(l31, proof[3]));
        proofRoot = _proofRoot;
        return (root == _proofRoot);
    }

    function computeRootV0(string[] memory inputs) public {
        for (uint i = 0; i < inputs.length; i++) {
            hashes.push(keccak256(abi.encodePacked(inputs[i])));
        }

        bytes32 l11 = keccak256(abi.encodePacked(hashes[0], hashes[1]));
        bytes32 l12 = keccak256(abi.encodePacked(hashes[2], hashes[3]));
        bytes32 l13 = keccak256(abi.encodePacked(hashes[4], hashes[5]));
        bytes32 l14 = keccak256(abi.encodePacked(hashes[6], hashes[7]));
        bytes32 l15 = keccak256(abi.encodePacked(hashes[8], hashes[9]));
        bytes32 l21 = keccak256(abi.encodePacked(l11, l12));
        bytes32 l22 = keccak256(abi.encodePacked(l13, l14));
        bytes32 l31 = keccak256(abi.encodePacked(l21, l22));
        root = keccak256(abi.encodePacked(l31, l15));
    }
}
