import express = require('express');
import { routeHandler } from "../handler";
import { contractController } from "../../controllers";


export const contractRouter = express.Router();

contractRouter.post("/get_my_var", routeHandler(async (req, res) =>
    contractController.getMyVar(req, res))
)

contractRouter.post("/set_my_var", routeHandler(async (req, res) =>
    contractController.setMyVar(req, res))
)

contractRouter.post("/hashes", routeHandler(async (req, res) =>
    contractController.hashes(req, res))
)
contractRouter.post("/view/root", routeHandler(async (req, res) =>
    contractController.root(req, res))
)
contractRouter.post("/view/proof_root", routeHandler(async (req, res) =>
    contractController.proofRoot(req, res))
)

contractRouter.post("/merkle_proof", routeHandler(async (req, res) =>
    contractController.merkleProof(req, res))
)

contractRouter.post("/owner", routeHandler(async (req, res) =>
    contractController.owner(req, res))
)

contractRouter.post("/solved1", routeHandler(async (req, res) =>
    contractController.solved1(req, res))
)

contractRouter.post("/solved2", routeHandler(async (req, res) =>
    contractController.solved2(req, res))
)

/*
contractRouter.post("/verify", routeHandler(async (req, res) =>
    contractController.verify(req, res))
)*/

contractRouter.post("/tx/compute_root_v0", routeHandler(async (req, res) =>
    contractController.computeRootV0(req, res))
)
contractRouter.post("/tx/merkle_proof_ans", routeHandler(async (req, res) =>
    contractController.merkleProofAns(req, res))
)


contractRouter.post("/tx/test", routeHandler(async (req, res) =>
    contractController.test(req, res))
)

