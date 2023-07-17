import { Response, Request } from "express";
import { deployService } from "../services";

export class DeployController {
    async deploy(req: Request, res: Response) {
        res.json(
            await deployService.deploy()
        );
    }

    async upgrade(req: Request, res: Response) {
        const contractAddress: string = req.body.contract_address;
        res.json(
            await deployService.upgrade(contractAddress)
        );
    }
}