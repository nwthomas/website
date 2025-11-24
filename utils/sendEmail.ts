// The import here requires use of `require` instead of `import`
const nodemailer = require("nodemailer");

const EMAIL_HOST_NAME = process.env.EMAIL_HOST_NAME || "";
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "";
const EMAIL_PERSONAL_EMAIL = process.env.EMAIL_PERSONAL_EMAIL || "";
const EMAIL_PORT = process.env.EMAIL_PORT || "";
const EMAIL_TLS = process.env.EMAIL_TLS || "";
const EMAIL_USERNAME = process.env.EMAIL_USERNAME || "";

export interface NewEmail {
  name: string;
  email: string;
  message: string;
}

export const sendEmail = async (newEmail: NewEmail): Promise<boolean> => {
  const { name, email, message } = newEmail;

  const transportOptions = {
    host: EMAIL_HOST_NAME,
    port: EMAIL_PORT,
    tls: EMAIL_TLS,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(transportOptions);

  const subject = `From ${name}`;

  const result = await transporter.sendMail({
    from: EMAIL_PERSONAL_EMAIL,
    to: EMAIL_PERSONAL_EMAIL,
    subject,
    text: `${email}\n\n${message}`,
  });

  return !!result?.accepted?.length;
};
