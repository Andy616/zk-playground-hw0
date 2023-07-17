import { Server } from "./src/server";
import { middleware } from "./src/middleware";
import { settings } from "./src/config";
import { rootRouter } from "./src/routes";
import { errorHandler } from "./src/routes/handler";
import { logger } from "./src/logging";


const server = new Server(
    settings.SERVER_PORT,
    middleware,
    [rootRouter] //* Add your express router objects here
);


// this has to be in last place of middleware stack
server.addMiddleWare(errorHandler({
    logger: logger,
    skipPaths: [],
}));

server.listen()


process.on("SIGTERM", () => {
    server.shutdown()
});
process.on("SIGINT", () => {
    server.shutdown()
});
