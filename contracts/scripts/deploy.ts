import dotenv from "dotenv";
import { ethers } from "hardhat";

dotenv.config();

async function main() {
  const MessageHubFactory = await ethers.getContractFactory("MessageHub");

  // Deploy new contract
  // const messageHub = await MessageHubFactory.deploy();
  // await messageHub.deployed();
  // console.log("MessageHub deployed to:", messageHub.address);

  // Work with existing contract
  const messageHub = MessageHubFactory.attach(
    process.env.CONTRACT_ADDRESS || ""
  );
  const sendMessageTxn = await messageHub.sendMessage({
    name: "Test",
    email: "Test.com",
    message: "Test",
    fax: "",
  });
  await sendMessageTxn.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
