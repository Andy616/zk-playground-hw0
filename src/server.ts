import { Application } from "express";
import * as http from "http";
import express = require("express");

/**
 * Primary Class that constructs all of the parts of the Express server
 */
export class Server {
    protected app: Application;
    protected server?: http.Server;

    /**
     * @param port Port Application listens on
     * @param middleware Array of middleware to be applied to app
     * @param routes Array of express.Router objects for application routes
     */
    constructor(
        private port: number,
        middleware: Array<any>,
        routes: Array<express.Router>) {

        //* Create a new express app
        this.app = express();

        middleware.forEach((m) => {
            this.app.use(m);
        });

        routes.forEach((r) => {
            this.app.use(r);
        });
    }

    public addMiddleWare(middleWare: any) {
        this.app.use(middleWare);
    }

    /**
     * Start the Express app
     */
    public listen() {
        this.server = this.app.listen(this.port, () => {
            console.log("Server LISTENING ON PORT:", this.port);
        });
    }

    public shutdown() {
        // stop accepting new connections, and wait for existing connections being processed.
        if (this.server!.listening) {
            console.log("Shutting down");
            this.server!.close((err) => {
                if (err) {
                    console.error(err)
                    process.exit(1)
                }
                console.log("Application shutdown complete.");
                process.exit(0);
            })
        }
    }

}