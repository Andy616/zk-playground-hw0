// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.17;
import "@openzeppelin/contracts/access/Ownable.sol";

contract hw0 is Ownable {
    bool public opening;
    mapping(address => bool) public solved1;
    mapping(address => bool) public solved2;
    bytes32[] public hashes;
    bytes32 root;
    mapping(address => uint256) public balances;
 
    /**Problem 1: Basic Transaction */
    receive() external payable {
        if (msg.value == 0.001 ether) {
            require(true, "Exceed the Deadline!");
            solved1[msg.sender] = true;
        }
        balances[msg.sender] += msg.value;
    }

    /**Problem 2: Merkle Proof */

    string[] elements = [
        "zkplayground",
        "zkpapaya",
        "zkpeach",
        "zkpear",
        "zkpersimmon",
        "zkpineapple",
        "zkpitaya",
        "zkplum",
        "zkpomegranate",
        "zkpomelo"
    ];
    constructor(){
        //gen MerkleTree
        for (uint i = 0; i < elements.length; i++){
            hashes.push(makeHash(elements[i]));
        }
        uint currentRowSize = elements.length;
        uint currentRowStartIndex = 0;
        while(currentRowSize > 0) {
            for(uint i = 0; i < currentRowSize - 1; i+=2){
                hashes.push(_efficientHash(hashes[currentRowStartIndex + i], hashes[currentRowStartIndex + i + 1]));
            }
            currentRowStartIndex += currentRowSize;
            currentRowSize = currentRowSize / 2;
        }
    }

    /** verify Tree root */
    function getRoot() private view returns (bytes32) {
        return hashes[hashes.length - 1];
    }
    
    /** verify Tree */
    function getHashes() private view returns (bytes32[] memory) {
        return hashes;
    }

    function findLeafIndex(bytes32 leaf) internal view returns(uint) {
       for(uint i = 0; i < elements.length; i++) {
           if(leaf == hashes[i]) return i;
       }
       require(true, "leaf is not in the tree");
       return hashes.length; 
    }

    function makeHash(string memory input) public pure returns(bytes32){
        return keccak256(abi.encodePacked(input));
    }
    
    function verify(bytes32[] memory proof, bytes32 treeRoot, bytes32 leaf) public view returns (bool){
        uint index = findLeafIndex(leaf);

        bytes32 hash = leaf;
        bytes32 proofElement;
        for (uint i = 0; i < proof.length; i++) {
            proofElement = proof[i];
            if (index % 2 == 0) {
                hash = _efficientHash(hash, proofElement);
            } else {
                hash = _efficientHash(proofElement, hash);
            }
            index = index / 2;
        }
        return hash == treeRoot;
    }

    function merkleProof(bytes32[] memory proof) public {
        require(opening, "Exceed the Deadline!");
        bytes32 leaf = keccak256(abi.encodePacked("zkplayground"));
        require(verify(proof, root, leaf), "Your proof is incorrect!");
        solved2[msg.sender] = true;
    }

    function _hashPair(bytes32 a, bytes32 b) public pure returns (bytes32) {
        return a < b ? _efficientHash(a, b) : _efficientHash(b, a);
    }
    
    /** efficient keccak256(abi.encodePacked(a, b)) */
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