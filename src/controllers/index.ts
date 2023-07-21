import { ContractController } from "./contractController";
import { DeployController } from "./deployController";
import { MerkleTreeController } from "./merkleTreeController";
import { HwController } from "./hwController";

export const contractController = new ContractController();
export const hwController = new HwController();
export const deployController = new DeployController();
export const merkleTreeController = new MerkleTreeController();
