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

    function merkleProof(bytes32[] memory proof) public returns (bool) {
        bytes32 leaf = keccak256(abi.encodePacked("zkplayground"));
        require(verifyV0(proof, root, leaf), "Your proof is incorrect!");
        solved2[msg.sender] = true;
    }

    function verifyV0(
        bytes32[] memory proof,
        bytes32 root,
        bytes32 leaf
    ) public returns (bool) {
        bytes32 l11 = _hashPair(leaf, proof[0]);
        bytes32 l21 = _hashPair(l11, proof[1]);
        bytes32 l31 = _hashPair(l21, proof[2]);
        bytes32 _proofRoot = _hashPair(l31, proof[3]);
        proofRoot = _proofRoot;
        return (root == _proofRoot);
    }

    function computeRootV0(string[] memory inputs) public returns (bytes32) {
        for (uint i = 0; i < inputs.length; i++) {
            hashes.push(keccak256(abi.encodePacked(inputs[i])));
        }

        bytes32 l11 = _hashPair(hashes[0], hashes[1]);
        bytes32 l12 = _hashPair(hashes[2], hashes[3]);
        bytes32 l13 = _hashPair(hashes[4], hashes[5]);
        bytes32 l14 = _hashPair(hashes[6], hashes[7]);
        bytes32 l15 = _hashPair(hashes[8], hashes[9]);
        bytes32 l21 = _hashPair(l11, l12);
        bytes32 l22 = _hashPair(l13, l14);
        bytes32 l31 = _hashPair(l21, l22);
        root = _hashPair(l31, l15);
        return root;
    }

    function _hashPair(bytes32 a, bytes32 b) public pure returns (bytes32) {
        return a < b ? _efficientHash(a, b) : _efficientHash(b, a);
    }

    function _efficientHash(
        bytes32 a,
        bytes32 b
    ) private pure returns (bytes32 value) {
        assembly {
            mstore(0x00, a)
            mstore(0x20, b)
            value := keccak256(0x00, 0x40)
        }
    }
}
