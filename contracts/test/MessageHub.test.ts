import { expect } from "chai";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers } from "hardhat";

describe("MessageHub", function () {
  let account1: SignerWithAddress;
  let account2: SignerWithAddress;

  const getDeployedContract = async () => {
    const MessageHubFactory = await ethers.getContractFactory("MessageHub");
    const messageHub = await MessageHubFactory.deploy();

    return messageHub;
  };

  beforeEach(async () => {
    const [owner, second] = await ethers.getSigners();

    account1 = owner;
    account2 = second;
  });

  describe("ownership", () => {
    it("instantiates a new contract with owner", async () => {
      const project = await getDeployedContract();
      const owner = await project.owner();
      expect(owner).to.equal(account1.address);
    });

    it("transfers ownership", async () => {
      const project = await getDeployedContract();
      const transferOwnershipTxn = await project.transferOwnership(
        account2.address
      );
      expect(transferOwnershipTxn)
        .to.emit(project, "OwnershipTransferred")
        .withArgs(account1.address, account2.address);
    });

    it("throws error when non-owner attempts transfer", async () => {
      const project = await getDeployedContract();

      let error;
      try {
        await project.connect(account2).transferOwnership(account2.address);
      } catch (newError) {
        error = newError;
      }

      expect(
        String(error).indexOf("Ownable: caller is not the owner") > -1
      ).to.equal(true);
    });

    it("renounces ownership", async () => {
      const project = await getDeployedContract();
      const renounceOwnershipTxn = project.renounceOwnership();
      expect(renounceOwnershipTxn)
        .to.emit(project, "OwnershipTransferred")
        .withArgs(
          account1.address,
          "0x0000000000000000000000000000000000000000"
        );
    });

    it("throws error when non-owner attempts renouncing ownership", async () => {
      const project = await getDeployedContract();

      let error;
      try {
        await project.connect(account2).renounceOwnership();
      } catch (newError) {
        error = newError;
      }

      expect(
        String(error).indexOf("Ownable: caller is not the owner") > -1
      ).to.equal(true);
    });
  });

  describe("messages", () => {
    it("should throw an error when an invalid message is sent", async () => {
      const contract = await getDeployedContract();

      const invalidMessage = {
        name: "Test name field",
        email: "Test email field",
        message: "Test message field",
        fax: "This field should not be filled",
      };

      let error;
      try {
        await contract.sendMessage(invalidMessage);
      } catch (newError) {
        error = newError;
      }

      expect(error instanceof Error).to.equal(true);
      expect(
        String(error).indexOf("Error: Message could not be sent") > -1
      ).to.equal(true);
    });

    it("should emit an event when a valid message is sent", async () => {
      const contract = await getDeployedContract();

      const validMessage = {
        name: "Test name field",
        email: "Test email field",
        message: "Test message field",
        fax: "",
      };

      const txn = await contract.sendMessage(validMessage);
      expect(txn)
        .to.emit(contract, "NewMessage")
        .withArgs(validMessage.name, validMessage.email, validMessage.message);
    });
  });
});
