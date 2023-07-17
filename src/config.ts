import dotenv from "dotenv";

dotenv.config();


export namespace settings {

    export const SERVER_NAME: string = "zkp-hw0";

    export const SERVER_PORT: number = parseInt(getEnv("PORT", 8500));

    export const HARDHAT_DEFAULT_NETWORK: string = getEnv("HARDHAT_DEFAULT_NETWORK");
    export const NETWORK_URL: string = getEnv("NETWORK_URL");
    export const ACCOUNT: string = getEnv("ACCOUNT");
    export const CHAIN_ID: number = parseInt(getEnv("CHAIN_ID"));

}


function getEnv(name: string, defaults?: any): any {
    const value = process.env[name];
    if (value === undefined) {
        if (defaults === undefined) {
            throw new Error(`environment variable ${name} is undefined.`)
        } else {
            return defaults
        }
    } else {
        return value
    }
}
