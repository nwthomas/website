import applyMiddleware from "./middleware";
import express from "express";
import { sendEmail } from "../utils/sendEmail";

const server = express();

applyMiddleware(server);

server.get("/", (_, res) => {
  res.status(200).send({
    message: "The server is currently online",
    success: true,
  });
});

server.post("/api/send-message", async (req, res) => {
  const { email, fax, message, name } = req.body;

  if (fax?.length) {
    return res.status(404).send({
      message: "The message could not be sent.",
      success: false,
    });
  }

  const result = sendEmail({ name, email, message });

  if (result) {
    return res.status(200).send({
      message: "The message was sent successfully.",
      success: true,
    });
  } else {
    return res.status(502).send({
      message: "An error occurred while sending the message.",
      success: false,
    });
  }
});

export default server;
