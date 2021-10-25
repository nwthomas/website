import { ethers } from "hardhat";

async function main() {
  const MessageHubFactory = await ethers.getContractFactory("MessageHub");
  const messageHub = await MessageHubFactory.deploy();
  await messageHub.deployed();
  console.log("MessageHub deployed to:", messageHub.address);

  const mockValidMessage = {
    name: "Test name field",
    email: "Test email field",
    message: "Test message field",
    fax: "",
  };

  const mockInvalidMessage = {
    name: "Test name field",
    email: "Test email field",
    message: "Test message field",
    fax: "This field should not be filled",
  };

  let txn = await messageHub.sendMessage(mockValidMessage);
  await txn.wait();

  try {
    txn = await messageHub.sendMessage(mockInvalidMessage);
    await txn.wait();
  } catch (error) {
    console.log(error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
