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

    public async _hashPair(contractAddress: string, a: string, b: string): Promise<string> {
        const contract = await this.getContractByAddress(contractAddress);
        return contract._hashPair(a, b);
    }

    public async hashes(contractAddress: string, number: number): Promise<string> {
        const contract = await this.getContractByAddress(contractAddress);
        return contract.hashes(number);
    }

    public async merkleProof(contractAddress: string, proof: string[]): Promise<null> {
        const contract = await this.getContractByAddress(contractAddress);
        return contract.merkleProof(proof);
    }

    public async opening(contractAddress: string): Promise<boolean> {
        const contract = await this.getContractByAddress(contractAddress);
        return contract.opening();
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

    public async verify(contractAddress: string, proof: string[], root: string, leaf: string): Promise<boolean> {
        const contract = await this.getContractByAddress(contractAddress);
        return contract.verify(proof, root, leaf);
    }

    // test interaction

    public async getMyVar(contractAddress: string): Promise<string> {
        const contract = await this.getContractByAddress(contractAddress);
        return contract.getMyVar();
    }

    public async setMyVar(contractAddress: string, value: number): Promise<null> {
        const contract = await this.getContractByAddress(contractAddress);
        return contract.setMyVar(value);
    }

}