import { ethers } from "ethers";
import messageHub from "../constants/messageHub.json";
import { sendEmail } from "../utils/sendEmail";

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "";
const NETWORK_TYPE = process.env.NETWORK_TYPE || "";

export const listenForContractMessageEvent = async () => {
  const provider = new ethers.providers.AlchemyProvider(NETWORK_TYPE);

  const messageHubContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    messageHub.abi,
    provider
  );

  const deployedContract = messageHubContract.attach(CONTRACT_ADDRESS);

  deployedContract.on("NewMessage", (name, email, message) =>
    sendEmail({ name, email, message }, true)
  );
};