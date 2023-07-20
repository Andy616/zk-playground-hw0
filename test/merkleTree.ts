import Web3 from "web3";
import { MerkleTree } from 'merkletreejs'


const web3 = new Web3();


function keccak256(s: string): string {
    return web3.utils.keccak256(s)
}

function hashLeaf(s: string): string {
    const encoded = web3.utils.encodePacked(s)!
    return keccak256(encoded)
}


function main() {
    const values = [
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

    const leaves: string[] = values.map(x => hashLeaf(x))

    const tree = new MerkleTree(
        leaves,
        keccak256,
        {
            sortPairs: true
        }
    )
    // console.log(tree.toString())

    // const proof = tree.getProof(leaves[0])
    // console.log(proof.map(p => "0x" + p.data.toString("hex")))
    // console.log(tree.verify(proof, leaves[0], tree.getRoot()))

    for (let i = 0; i < leaves.length; i++) {
        const proof = tree.getProof(leaves[i])
        console.log(tree.verify(proof, leaves[i], tree.getRoot()))
    }

}

main()

