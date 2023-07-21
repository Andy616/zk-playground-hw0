import web3 from "./web3";
import { contractService } from "./";

export class HwService {

    public data: string[] = [
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

    public async submit() : Promise<any> {
        const address: string = "0x5c561Afb29903D14B17B8C5EA934D6760C882b7d";
        const contract = await contractService.getContractByAddress(address);

        const proofs = await this.proofOf1(address, this.data, 0);
        return await contract.merkleProof(proofs);
    }

    public async proofOf1(contractAddress: string, data: string[], index: number): Promise<string[]> {
        const contract = await contractService.getContractByAddress(contractAddress);
        const height = Math.ceil(Math.log2(data.length));
        var paddedLength = 2 ** height;
        var leaves: string[] = [];
        for(var i = 0; i < paddedLength; i++) {
            if (i < data.length) {
                leaves.push(this.hashString(data[i])); 
            }
            else {
                leaves.push("0");
            }
        }

        //Build tree
        var count = paddedLength; 
        var offset = 0;
        while(count > 0) {
            for(var i = 0; i < count - 1; i += 2) {
                var leaf = leaves[offset+i];
                if (leaves[offset+i+1] != "0") {
                    leaf = await contract._hashPair(leaves[offset+i], leaves[offset+i+1]);
                }
                leaves.push(leaf);
            }
            offset += count;
            count = count / 2;
        }

        //Pick proofs
        var currentIndex: number = index;
        offset = 0;
        var proofs: string[] = [];
        for(var i = 0; i < height; i++) {
            currentIndex = offset + Math.floor(index/2**i);

            var proofIndex = currentIndex%2 == 0 ? currentIndex+1:currentIndex-1;
            console.log("leaves["+proofIndex+"]:"+leaves[proofIndex]);
            if (leaves[proofIndex] != "0") {
                proofs.push(leaves[proofIndex]);
            }

            offset += 2 ** (height-i);
        }

        return proofs;
    }

    private hashString(s: string): string {
        return web3.utils.keccak256(web3.utils.encodePacked(s)!)
    }      

}
