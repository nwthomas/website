import { ethers } from "hardhat";
// Importing with require statement as TS has a hard time with this dependency
const ethProvider = require("eth-provider");

async function main() {
  // For more information about how to set up Frame deployment, check out:
  // https://github.com/NomicFoundation/hardhat/issues/1159
  const frame = ethProvider("frame", {
    alchemyId: process.env.MAINNET_APP_SECRET_KEY,
  });
  const MessageHubContractFactory = await ethers.getContractFactory(
    "MessageHub"
  );

  const deployTxn = await MessageHubContractFactory.getDeployTransaction();

  deployTxn.from = (await frame.request({ method: "eth_requestAccounts" }))[0];

  await frame.request({
    method: "eth_sendTransaction",
    params: [deployTxn],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
