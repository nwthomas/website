import { ethers } from "ethers";
import messageHub from "./messageHub.json";

const NETWORK_TYPE = "rinkeby";

export const listenForContractMessageEvent = () => {
  const provider = new ethers.providers.AlchemyProvider(
    NETWORK_TYPE,
    process.env.ALCHEMY_API
  );
  const messageHubContract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    messageHub.abi
  );

  const filter = {
    address: process.env.CONTRACT_ADDRESS,
    topics: [ethers.utils.id("Message(string,string,string,string)")],
  };
  console.log(filter);

  provider.on(filter, (value) => {
    console.log("Success");
  });
};
