// This is not ideal as it would be better to use the NextJS-defined types, but doing this allows
// the rate limiting middleware to not need type coercion. The difference between the ExpressJS
// and NextJS types are minimul (as NextJS has some additional values). TypeScript seems to be
// happy here, so I'm leaving it as-is for now.
import { Request, Response } from "express";

import { applyRateLimit } from "./../../utils/rateLimit";
import { sendEmail } from "../../utils/sendEmail";

const POST_METHOD = "POST";
const STATUS_200 = "The message was sent successfully.";
const STATUS_404 = "The message could not be sent.";
const STATUS_405 = "This request type is not supported.";
const STATUS_429 = "Too many requests";
const STATUS_500 = "Internal server error";
const STATUS_502 = "An error occurred while sending the message.";

export default async function handler(request: Request, response: Response) {
  // Return early if not POST request which is the only type the client has been set
  // up to send. This means it's a user sending a request via a man-in-the-middle
  // (proxy request).
  if (request.method !== POST_METHOD) {
    return response.status(405).send({
      message: STATUS_405,
    });
  }

  try {
    await applyRateLimit(request, response);
  } catch (error) {
    return response.status(429).send({
      message: STATUS_429,
    });
  }

  const requestBody = JSON.parse(request.body);
  const { email, fax, message, name } = requestBody;

  let status = 200;
  let responseMessage = STATUS_200;

  // If the fax string exists and length is greater than 0, this is a bot request
  if (fax?.length) {
    status = 404;
    responseMessage = STATUS_404;
  }

  try {
    const result = await sendEmail({ name, email, message });

    if (result) {
      status = 200;
      responseMessage = STATUS_200;
    } else {
      status = 502;
      responseMessage = STATUS_502;
    }
  } catch (error) {
    status = 500;
    responseMessage = STATUS_500;
  }

  return response.status(status).send({ message: responseMessage });
}
