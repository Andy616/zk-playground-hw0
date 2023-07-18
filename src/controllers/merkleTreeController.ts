import { Response, Request } from "express";
import { merkleTreeService } from "../services";

export class MerkleTreeController {
    async proofOf(req: Request, res: Response) {
        const values: string[] = req.body.values;
        const index: number = req.body.index;

        res.json(
            await merkleTreeService.proofOf(values, index)
        );
    }
}