import { Configuration, OpenAIApi } from "openai";
// This is not ideal as it would be better to use the NextJS-defined types, but doing this allows
// the rate limiting middleware to not need type coercion. The difference between the ExpressJS
// and NextJS types are minimal (as NextJS has some additional values). TypeScript seems to be
// happy here, so I'm leaving it as-is for now.
import { Request, Response } from "express";
import {
  STATUS_200,
  STATUS_405,
  STATUS_429,
  STATUS_500,
  STATUS_502,
} from "../../constants/statusCodes";

import { POST_METHOD } from "../../constants/httpMethods";
import { applyRateLimit } from "./../../utils/rateLimit";

const OPEN_AI_API_KEY = process.env.OPEN_AI_SECRET_KEY || "";
const OPEN_AI_INITIAL_PROMPT = "You are a helpful assistant for gardeners";
const OPEN_AI_MODEL = "gpt-3.5-turbo";
const OPEN_AI_ORGANIZATION_NAME = "org-rBZRppIgcA6PWxO5qPDONshX";

const CONFIGURATION_OPTIONS = {
  organization: OPEN_AI_ORGANIZATION_NAME,
  apiKey: OPEN_AI_API_KEY,
};

const configuration = new Configuration(CONFIGURATION_OPTIONS);
const openai = new OpenAIApi(configuration);

export default async function handler(request: Request, response: Response) {
  // Return early if not POST request which is the only type the client has been set
  // up to send. This means it's a user sending a request via a man-in-the-middle
  // (proxy request).
  if (request.method !== POST_METHOD) {
    return response.status(405).send({
      message: STATUS_405,
      success: false,
    });
  }

  const { query } = request.body;

  try {
    await applyRateLimit(request, response);
  } catch (error) {
    return response.status(429).send({
      message: STATUS_429,
      success: false,
    });
  }

  try {
    const { data } = await openai.createChatCompletion({
      model: OPEN_AI_MODEL,
      temperature: 0.7,
      max_tokens: 1000,
      messages: [
        {
          role: "system",
          content: OPEN_AI_INITIAL_PROMPT,
        },
        // TODO: spread in all user queries saved previously in DB
        {
          role: "user",
          content: query,
        },
      ],
    });

    if (data) {
      // TODO: Store in DB and then send to client
      return response.status(200).send({
        message: STATUS_200,
        success: true,
        data,
      });
    } else {
      return response.status(502).send({
        message: STATUS_502,
        success: false,
      });
    }
  } catch (error) {
    return response.status(500).send({
      message: STATUS_500,
      success: false,
    });
  }
}
