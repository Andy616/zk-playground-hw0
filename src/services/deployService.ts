import { ethers, upgrades } from "hardhat";
import { DeployResult } from "../types";


export class DeployService {

    async deploy(): Promise<DeployResult> {
        const contractToDeploy = await ethers.getContractFactory("hw0");
        const contract = await upgrades.deployProxy(contractToDeploy);
        await contract.deployed();
        let contractAddress: string = contract.address;

        return { contract_address: contractAddress };
    }

    async upgrade(contractAddress: string): Promise<DeployResult> {
        const contractToUpgrade = await ethers.getContractFactory("hw0");
        await upgrades.forceImport(contractAddress, contractToUpgrade);
        await upgrades.upgradeProxy(contractAddress, contractToUpgrade);
        return { contract_address: contractAddress };
    }

}
