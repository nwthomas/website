import { NextApiRequest, NextApiResponse } from "next";

import { sendEmail } from "../../utils/sendEmail";

const POST_METHOD = "POST";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== POST_METHOD) {
    return res.status(405).send({
      message: "This request type is not supported.",
      success: false,
    });
  }

  const { email, fax, message, name } = req.body;

  if (fax?.length) {
    return res.status(404).send({
      message: "The message could not be sent.",
      success: false,
    });
  }

  const result = await sendEmail({ name, email, message });

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
}
