import express, { Express, Request, Response, Next } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { ALLOWLIST } from "./../constants/allowlist";
dotenv.config();

function isValidDomain(req: Request, res: Response, next: Next) {
  if (ALLOWLIST.includes(req.get("origin"))) {
    next();
  } else {
    return res.status(421).send({
      message: "The request is not allowed.",
      success: false,
    });
  }
}

export default (server: Express) => {
  server.use(express.json());
  server.use(cors());
  server.use(helmet());
  server.use(morgan("common"));
  server.use(isValidDomain);
};
