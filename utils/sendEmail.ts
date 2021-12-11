import cryptojs from "crypto-js";
import nodemailer from "nodemailer";

const SECRET_KEY = process.env.SECRET_KEY || "";

type NewEmail = {
  name: string;
  email: string;
  message: string;
};

export const sendEmail = async (newEmail: NewEmail, withWeb3?: boolean) => {
  const {
    name: encryptedName,
    email: encryptedEmail,
    message: encryptedMessage,
  } = newEmail;

  // Client-side encodes the values for a bit of extra protection with events being
  // logged on the Ethereum blockchain, so this merely decrypts them
  let name = encryptedName;
  let email = encryptedEmail;
  let message = encryptedMessage;
  if (withWeb3) {
    const nameBytes = cryptojs.AES.decrypt(name, SECRET_KEY);
    name = JSON.parse(nameBytes.toString(cryptojs.enc.Utf8));

    const emailBytes = cryptojs.AES.decrypt(email, SECRET_KEY);
    email = JSON.parse(emailBytes.toString(cryptojs.enc.Utf8));

    const messageBytes = cryptojs.AES.decrypt(message, SECRET_KEY);
    message = JSON.parse(messageBytes.toString(cryptojs.enc.Utf8));
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

  const subjectEnding = withWeb3 ? " (with blockchain)" : "";
  const subject = `From ${name}${subjectEnding}`;

  const result = await transporter.sendMail({
    from: process.env.PERSONAL_EMAIL,
    to: process.env.PERSONAL_EMAIL,
    subject,
    text: `${email}\n\n${message}`,
  });

  return !!result?.accepted?.length;
};
