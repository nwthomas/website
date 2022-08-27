import { ethers, run } from "hardhat";

// Fill in and use for verification of the contract on Etherscan. Fill in
// deploy arguments and run with 'verify' npm command
(async function verifyContract() {
  await run("verify:verify", {
    address: "",
    constructorArguments: ["", "", ethers.utils.parseEther("0.02"), "", []],
  });
})();
