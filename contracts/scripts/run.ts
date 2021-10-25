import { ethers } from "hardhat";

async function main() {
  const MessageHubFactory = await ethers.getContractFactory("MessageHub");
  const messageHub = await MessageHubFactory.deploy();
  await messageHub.deployed();
  console.log("MessageHub deployed to:", messageHub.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
