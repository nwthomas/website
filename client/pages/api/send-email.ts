import { NextApiRequest, NextApiResponse } from "next";

import { applyRateLimit } from "./../../utils/rateLimit";
import { sendEmail } from "../../utils/sendEmail";

const POST_METHOD = "POST";
const STATUS_200 = "The message was sent successfully.";
const STATUS_404 = "The message could not be sent.";
const STATUS_405 = "This request type is not supported.";
const STATUS_429 = "Too many requests";
const STATUS_502 = "An error occurred while sending the message.";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== POST_METHOD) {
    return response.status(405).send({
      message: STATUS_405,
      success: false,
    });
  }

  try {
    await applyRateLimit(request, response);
  } catch (error) {
    return response.status(429).send(STATUS_429);
  }

  const { email, fax, message, name } = request.body;

  if (fax?.length) {
    return response.status(404).send({
      message: STATUS_404,
      success: false,
    });
  }

  const result = await sendEmail({ name, email, message });

  if (result) {
    return response.status(200).send({
      message: STATUS_200,
      success: true,
    });
  } else {
    return response.status(502).send({
      message: STATUS_502,
      success: false,
    });
  }
}
