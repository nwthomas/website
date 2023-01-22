const nodemailer = require("nodemailer");

const EMAIL_PORT = process.env.EMAIL_PORT || "";
const HOST_NAME = process.env.HOST_NAME || "";
const PASSWORD = process.env.PASSWORD || "";
const TLS = process.env.TLS || "";
const USERNAME = process.env.USERNAME || "";

export interface NewEmail {
  name: string;
  email: string;
  message: string;
}

export const sendEmail = async (newEmail: NewEmail): Promise<boolean> => {
  const { name, email, message } = newEmail;

  const transportOptions = {
    host: HOST_NAME,
    port: EMAIL_PORT,
    tls: TLS,
    auth: {
      user: USERNAME,
      pass: PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(transportOptions);

  const subject = `From ${name}`;

  const result = await transporter.sendMail({
    from: process.env.PERSONAL_EMAIL,
    to: process.env.PERSONAL_EMAIL,
    subject,
    text: `${email}\n\n${message}`,
  });

  return !!result?.accepted?.length;
};
