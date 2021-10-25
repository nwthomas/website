import { expect } from "chai";
import { ethers } from "hardhat";

describe("MessageHub", function () {
  let ownerAddress, secondAddress, thirdAddress;

  const getDeployedContract = async () => {
    const MessageHubFactory = await ethers.getContractFactory("MessageHub");
    const messageHub = await MessageHubFactory.deploy();

    return messageHub;
  };

  beforeEach(async () => {
    const [owner, second, third] = await ethers.getSigners();

    ownerAddress = owner;
    secondAddress = second;
    thirdAddress = third;
  });

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
    console.log(txn);
    expect(txn)
      .to.emit(contract, "NewMessage")
      .withArgs(validMessage.name, validMessage.email, validMessage.message);
  });
});
