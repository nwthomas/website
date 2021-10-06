const hre = require("hardhat");

const main = async () => {
  const messageHubFactory = await hre.ethers.getContractFactory("MessageHub");
  const messageHub = await messageHubFactory.deploy();
  await messageHub.deployed();
  console.log("Contract deployed to:", nftContract.address);
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
