import nodemailer from "nodemailer";

type NewEmail = {
  name: string;
  email: string;
  message: string;
};

export const sendEmail = async (newEmail: NewEmail, withWeb3?: boolean) => {
  const { name, email, message } = newEmail;

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
