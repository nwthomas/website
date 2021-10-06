import express from "express";
import nodemailer from "nodemailer";
import applyMiddleware from "./middleware";

const server = express();

applyMiddleware(server);

server.post("/api/send-email", async (req, res) => {
  console.log(req.body);
  const { email, fax, message, name } = req.body;

  if (fax?.length) {
    return new Error();
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
  console.log({ result });
});

export default server;
