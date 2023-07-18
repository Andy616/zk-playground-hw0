import express = require('express');
import { routeHandler } from "../handler";
import { deployController } from "../../controllers";
import { contractRouter } from "./contracts";
import { merkleTreeRouter } from "./merkleTree";


export const apiRouter = express.Router();

apiRouter.use("/contract", contractRouter)
apiRouter.use("/merkle_tree", merkleTreeRouter)

apiRouter.post("/deploy", routeHandler(async (req, res) =>
    deployController.deploy(req, res))
)
apiRouter.post("/upgrade", routeHandler(async (req, res) =>
    deployController.upgrade(req, res))
)
