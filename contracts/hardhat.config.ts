import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";

dotenv.config();

// This is a shim since TypeScript isn't happy with these two additional objects
type ExtendedHardhatUserConfig = HardhatUserConfig & {
  gasReporter: any;
  etherscan: any;
  watcher: any;
};

const config: ExtendedHardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    mainnet: {
      url: process.env.MAINNET_APP_SECRET_KEY || "",
      chainId: 1,
    },
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      accounts:
        process.env.RINKEBY_WALLET_PRIVATE_KEY !== undefined
          ? [process.env.RINKEBY_WALLET_PRIVATE_KEY]
          : [],
    },
  },
  gasReporter: {
    enabled:
      Boolean(process.env.REPORT_GAS) && process.env.REPORT_GAS !== "false",
    currency: "USD",
    coinmarketcap: process.env.COIN_MARKET_CAP_API_KEY || "",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || "",
  },
  watcher: {
    compilation: {
      tasks: ["compile"],
      files: ["./contracts"],
      verbose: true,
    },
    ci: {
      tasks: [
        "clean",
        { command: "compile", params: { quiet: true } },
        {
          command: "test",
          params: {
            noCompile: true,
            testFiles: ["./test/MessageHub.test.js"],
          },
        },
      ],
    },
  },
};

export default config;
