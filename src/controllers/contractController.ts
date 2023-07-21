import { Response, Request } from "express";
import { contractService } from "../services";


export class ContractController {

    public async getMyVar(req: Request, res: Response) {
        const contractAddress: string = req.body.contract_address;

        res.json(
            await contractService.getMyVar(contractAddress)
        );
    }

    public async setMyVar(req: Request, res: Response) {
        const contractAddress: string = req.body.contract_address;
        const value: number = req.body.value;

        res.json(
            await contractService.setMyVar(contractAddress, value)
        );
    }


    public async root(req: Request, res: Response) {
        const contractAddress: string = req.body.contract_address;

        res.json(
            await contractService.root(contractAddress)
        );
    }
    public async proofRoot(req: Request, res: Response) {
        const contractAddress: string = req.body.contract_address;

        res.json(
            await contractService.proofRoot(contractAddress)
        );
    }

    public async hashes(req: Request, res: Response) {
        const contractAddress: string = req.body.contract_address;
        const number: number = req.body.number;

        res.json(
            await contractService.hashes(contractAddress, number)
        );
    }

    public async merkleProof(req: Request, res: Response) {
        const contractAddress: string = req.body.contract_address;
        const proof: string[] = req.body.proof;

        res.json(
            await contractService.merkleProof(contractAddress, proof)
        );
    }

    public async owner(req: Request, res: Response) {
        const contractAddress: string = req.body.contract_address;

        res.json(
            await contractService.owner(contractAddress)
        );
    }

    public async solved1(req: Request, res: Response) {
        const contractAddress: string = req.body.contract_address;
        const address: string = req.body.address;

        res.json(
            await contractService.solved1(contractAddress, address)
        );
    }

    public async solved2(req: Request, res: Response) {
        const contractAddress: string = req.body.contract_address;
        const address: string = req.body.address;

        res.json(
            await contractService.solved2(contractAddress, address)
        );
    }
/*
    public async verify(req: Request, res: Response) {
        const contractAddress: string = req.body.contract_address;
        const proof: string[] = req.body.proof;
        const root: string = req.body.root;
        const leaf: string = req.body.leaf;

        res.json(
            await contractService.verify(contractAddress, proof, root, leaf)
        );
    }*/

    public async computeRootV0(req: Request, res: Response) {
        const contractAddress: string = req.body.contract_address;

        res.json(
            await contractService.computeRootV0(contractAddress)
        );
    }

    public async merkleProofAns(req: Request, res: Response) {
        const contractAddress: string = req.body.contract_address;

        res.json(
            await contractService.merkleProofAns(contractAddress)
        );
    }

}
