import { Response, Request } from "express";
import { hwService } from "../services";


export class HwController {

    public async submit(req: Request, res: Response) {
        res.json(
            await hwService.submit()
        );
    }

    public async testProofOf1(req: Request, res: Response) {
        const contractAddress: string = req.body.contract_address;
        const data: string[] = req.body.data;
        const index: number = req.body.index;

        res.json(
            await hwService.proofOf1(contractAddress, data, index)
        );
    }

}
