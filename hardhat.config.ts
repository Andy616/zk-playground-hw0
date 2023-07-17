import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import { settings } from "./src/config";


const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.17",
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000,
            },
        },
    },
    defaultNetwork: settings.HARDHAT_DEFAULT_NETWORK,
    networks: {
        hardhat: {},
        dev: {  // HARDHAT_DEFAULT_NETWORK
            url: settings.NETWORK_URL,
            accounts: [settings.ACCOUNT],
            chainId: settings.CHAIN_ID
        },
    },
};

export default config;
