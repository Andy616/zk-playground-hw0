import { ethers } from "hardhat";
import { Contract } from "ethers";


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
        const data: string[] = ["0xcc61ebc064488ecc9c6aa0138875f527fe4033a5b0fb9a1acf9d48f8809a82e9","0x6cba9ea971cd36a1100bbe94d254d62109b18a1eb3714c80fbbcc9ffef369744","0x1970fd3f2368dcb865dcb5b9114974e721fc396397503ac3aec52b594c8caf2d","0x48e40f6315e524c119b977fa35981dbdc77f77a902637ce4f4ac173a8bf497d1"];
        const result: string = await contract.merkleProof(data);
        return result;
    }

}