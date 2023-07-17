import express = require('express');
import { apiRouter } from "./api";
import { routeLogger } from "./handler";
import { logger } from "../logging";




export const rootRouter = express.Router();

rootRouter.use(routeLogger({
    logger: logger,
    skipPaths: [],
}));


rootRouter.use("/api", apiRouter);

// handles any no path matching request, keep this as the last route
rootRouter.use(function (req, res) {
    // we don't need log for this, thus response directly
    res.status(404).json({error: "Not Found"})
})
