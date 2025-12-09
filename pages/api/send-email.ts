// This is not ideal as it would be better to use the NextJS-defined types, but doing this allows
// the rate limiting middleware to not need type coercion. The difference between the ExpressJS
// and NextJS types are minimul (as NextJS has some additional values). TypeScript seems to be
// happy here, so I'm leaving it as-is for now.
import { Request, Response } from "express";

import { NextApiRequest } from "next";
import { applyRateLimit } from "./../../utils/rateLimit";
import { sendEmail } from "../../utils/sendEmail";
import { verifyCsrfToken } from "../../utils/csrfToken";

const POST_METHOD = "POST";

const STATUS_200 = "The message was sent successfully";
const STATUS_403 = "Request not allowed";
const STATUS_404 = "The message could not be sent";
const STATUS_405 = "This request type is not supported";
const STATUS_429 = "Too many requests";
const STATUS_500 = "Internal server error";
const STATUS_502 = "An error occurred while sending the message";

const ALLOWED_ORIGINS = ["https://nathanthomas.dev", "https://www.nathanthomas.dev"];

if (process.env.NODE_ENV === "development") {
  ALLOWED_ORIGINS.push("http://localhost:3000");
}

export default async function handler(request: Request, response: Response) {
  // Return early if not POST request which is the only type the client has been set
  // up to send. This means it's a user sending a request via a man-in-the-middle
  // (proxy request).
  if (request.method !== POST_METHOD) {
    return response.status(405).send({
      message: STATUS_405,
    });
  }

  let { csrfToken: _csrfToken, email, fax, message, name } = JSON.parse(request.body);

  // Next, verify the CSRF token. Reject the request if the token comparison (form value === cookie
  // value) fails the check (or if the token in either location is missing or invalid).
  // TODO: Re-enable CSRF token verification
  // try {
  //   // Express Request/Response types are used for compatibility with the rate limiting middleware,
  //   // but this function requires NextApiRequest types. Type casting here is sufficient and safe
  //   // as it's the actual type. Express types are a superset of the NextApiRequest types.
  //   verifyCsrfToken(request as unknown as NextApiRequest, csrfToken);
  // } catch {
  //   return response.status(403).send({
  //     message: STATUS_403,
  //   });
  // }

  const origin = request.headers.origin || request.headers.referer;
  if (origin) {
    try {
      const originUrl = new URL(origin);
      const isOriginAllowed = ALLOWED_ORIGINS.some((allowedOrigin) => {
        try {
          const allowedUrl = new URL(allowedOrigin);
          return originUrl.origin === allowedUrl.origin;
        } catch {
          return false;
        }
      });

      if (!isOriginAllowed) {
        return response.status(403).send({
          message: STATUS_403,
        });
      }
    } catch {
      // If origin URL parsing fails, reject the request
      return response.status(403).send({
        message: STATUS_403,
      });
    }
  } else {
    // No origin header, reject the request
    return response.status(403).send({
      message: STATUS_403,
    });
  }

  try {
    await applyRateLimit(request, response);
  } catch (error) {
    return response.status(429).send({
      message: STATUS_429,
    });
  }

  // If we're past the origin check and we still hit this if statement, something has gone seriously
  // wrong on the front-end.
  if (!email || !message || !name) {
    return response.status(400).send({
      message: STATUS_404,
    });
  }

  let status = 200;
  let responseMessage = STATUS_200;

  // If the fax string exists and length is greater than 0, this is a bot request. Still send the email,
  // but flag it specifically as a bot email request while presenting to the bot that it failed.
  if (fax?.length) {
    name = "Bot Email: " + name;
    responseMessage = STATUS_404;
    status = 404;
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
