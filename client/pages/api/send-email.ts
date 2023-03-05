// This is not ideal as it would be better to use the NextJS-defined types
import { Request, Response } from "express";

import { applyRateLimit } from "./../../utils/rateLimit";
import { sendEmail } from "../../utils/sendEmail";

const POST_METHOD = "POST";
const STATUS_200 = "The message was sent successfully.";
const STATUS_404 = "The message could not be sent.";
const STATUS_405 = "This request type is not supported.";
const STATUS_429 = "Too many requests";
const STATUS_502 = "An error occurred while sending the message.";

export default async function handler(request: Request, response: Response) {
  if (request.method !== POST_METHOD) {
    return response.status(405).send({
      message: STATUS_405,
      success: false,
    });
  }

  try {
    await applyRateLimit(request, response);
  } catch (error) {
    return response.status(429).send({
      message: STATUS_429,
      success: false,
    });
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
