const hre = require("hardhat");

const main = async () => {
  const messageHubFactory = await hre.ethers.getContractFactory("MessageHub");
  const messageHub = await messageHubFactory.deploy();
  await messageHub.deployed();
  console.log("Contract deployed to:", messageHub.address);

  const txn = await messageHub.sendMessage({
    name: "test",
    email: "test@me.com",
    message: "This is a test",
    fax: "",
  });
  await txn.wait();
};

(async function runMain() {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
