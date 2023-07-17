import express = require('express');
import { routeHandler } from "../handler";
import { deployController } from "../../controllers";
import { contractRouter } from "./contracts";


export const apiRouter = express.Router();

apiRouter.use("/contract", contractRouter)

apiRouter.post("/deploy", routeHandler(async (req, res) =>
    deployController.deploy(req, res))
)
apiRouter.post("/upgrade", routeHandler(async (req, res) =>
    deployController.upgrade(req, res))
)
