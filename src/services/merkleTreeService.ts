import { MerkleTree } from 'merkletreejs'
import web3 from "./web3";


export class MerkleTreeService {


    private hash(s: string): string {
        return web3.utils.keccak256(s)
    }

    private toLeaf(s: string): string {
        return this.hash(web3.utils.encodePacked(s)!)
    }

    createTree(values: string[]): MerkleTree {
        const leaves: string[] = values.map(x => this.toLeaf(x))
        return new MerkleTree(
            leaves,
            this.hash,
            {
                sortPairs: true
            }
        )
    }

    getProof(tree: MerkleTree, value: string): string[] {
        return tree.getProof(this.toLeaf(value)).map(p => `0x${p.data.toString("hex")}`)
    }

    proofOf(value: string[], index: number): string[] {
        const tree = this.createTree(value)
        return this.getProof(tree, value[index])
    }

}
