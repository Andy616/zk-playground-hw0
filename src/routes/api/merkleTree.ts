import express = require('express');
import { routeHandler } from "../handler";
import { merkleTreeController } from "../../controllers";


export const merkleTreeRouter = express.Router();


merkleTreeRouter.post("/generate_proof", routeHandler(async (req, res) =>
    merkleTreeController.proofOf(req, res)
))
