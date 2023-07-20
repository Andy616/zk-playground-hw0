import { ethers } from "hardhat";
import { Contract } from "ethers";
import web3 from "./web3";

export class ContractService {

    private static getContractArtifact() {
        return require("../../artifacts/contracts/hw0.sol/hw0.json");
    }

    public getContractABI() {
        return ContractService.getContractArtifact().abi
    }

    private async getContractByAddress(address: string): Promise<Contract> {
        const accounts = await ethers.getSigners();
        const signer = accounts[0];
        return new ethers.Contract(address, this.getContractABI(), signer);
    }

    /**
     * Contract functions below
     */
    public async root(contractAddress: string): Promise<string> {
        const contract = await this.getContractByAddress(contractAddress);
        return contract.root();
    }

    public async proofRoot(contractAddress: string): Promise<string> {
        const contract = await this.getContractByAddress(contractAddress);
        return contract.proofRoot();
    }

    public async hashes(contractAddress: string, number: number): Promise<string> {
        const contract = await this.getContractByAddress(contractAddress);
        return contract.hashes(number);
    }

    public async merkleProof(contractAddress: string, proof: string[]): Promise<null> {
        const contract = await this.getContractByAddress(contractAddress);
        return contract.merkleProof(proof);
    }

    public async owner(contractAddress: string): Promise<string> {
        const contract = await this.getContractByAddress(contractAddress);
        return contract.owner();
    }

    public async solved1(contractAddress: string, address: string): Promise<boolean> {
        const contract = await this.getContractByAddress(contractAddress);
        return contract.solved1(address);
    }

    public async solved2(contractAddress: string, address: string): Promise<boolean> {
        const contract = await this.getContractByAddress(contractAddress);
        return contract.solved2(address);
    }
/*
    public async verify(contractAddress: string, proof: string[], root: string, leaf: string): Promise<boolean> {
        const contract = await this.getContractByAddress(contractAddress);
        return contract.verify(proof, root, leaf);
    }
*/
    // test interaction
    public async getMyVar(contractAddress: string): Promise<string> {
        const contract = await this.getContractByAddress(contractAddress);
        const result: bigint = await contract.getMyVar();
        return result.toString();
    }

    public async setMyVar(contractAddress: string, value: number): Promise<null> {
        const contract = await this.getContractByAddress(contractAddress);
        return contract.setMyVar(value);
    }

    public async computeRootV0(contractAddress: string): Promise<any> {
        const contract = await this.getContractByAddress(contractAddress);
        const data: string[] = [
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
        const result: string = await contract.computeRootV0(data);
        return result;
    }

    public async merkleProofAns(contractAddress: string): Promise<any> {
        const contract = await this.getContractByAddress(contractAddress);
        const data: string[] = ["0xcc61ebc064488ecc9c6aa0138875f527fe4033a5b0fb9a1acf9d48f8809a82e9","0x6cba9ea971cd36a1100bbe94d254d62109b18a1eb3714c80fbbcc9ffef369744","0x40ef6049493657f0558c92f1f64806570ebba9e20cd40eb1385d8c61b3c523c7","0xa7a7ef787c98fd4abfa510e07a146c11dbfcc93e6a316a41cb57f0dfa2b4cbd6"];
        const result: string = await contract.merkleProof(data);
        return result;
    }

    public async test(contractAddress: string, index: number): Promise<string[]> {
        const data: string[] = [
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
        return this.proofOf(contractAddress, data, index);
    }

    private async proofOf(contractAddress: string, data: string[], index: number): Promise<string[]> {
        const contract = await this.getContractByAddress(contractAddress);
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

        //return contract.merkleProof(proof);
        return proofs;
    }

    private hashString(s: string): string {
        return web3.utils.keccak256(web3.utils.encodePacked(s)!)
    }      
   

}