import express = require('express');
import { routeHandler } from "../handler";
import { hwController } from "../../controllers";


export const hwRouter = express.Router();


hwRouter.post("/submit", routeHandler(async (req, res) =>
    hwController.submit(req, res))
)

hwRouter.post("/test/proof_of_1", routeHandler(async (req, res) =>
    hwController.testProofOf1(req, res))
)