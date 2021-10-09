import express from "express";
import nodemailer from "nodemailer";
import applyMiddleware from "./middleware";

const server = express();

applyMiddleware(server);

server.get("/", (_, res) => {
  res.status(200).send({
    message: "The server is currently online",
    success: true,
  });
});

server.post("/api/send-email", async (req, res) => {
  const { email, fax, message, name } = req.body;
  console.log(req.get("host"));

  if (fax?.length) {
    return res.status(404).send({
      message: "The message could not be sent.",
      success: false,
    });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.HOST_NAME,
    port: process.env.EMAIL_PORT,
    tls: process.env.TLS,
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD,
    },
  });

  const newEmail = {
    from: process.env.PERSONAL_EMAIL,
    to: process.env.PERSONAL_EMAIL,
    subject: `From ${name}`,
    text: `${email}\n\n${message}`,
  };

  const result = await transporter.sendMail(newEmail);

  if (result?.accepted?.length) {
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
