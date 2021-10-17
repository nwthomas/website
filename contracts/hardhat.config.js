require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_APP_SECRET_KEY,
      accounts: [process.env.RINKEBY_WALLET_PRIVATE_KEY],
    },
  },
};
