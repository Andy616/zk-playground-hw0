import { ContractService } from "./contractService";
import { DeployService } from "./deployService";
import { MerkleTreeService } from "./merkleTreeService";
import { HwService } from "./hwService";


export const contractService = new ContractService();
export const deployService = new DeployService();
export const merkleTreeService = new MerkleTreeService();
export const hwService = new HwService();