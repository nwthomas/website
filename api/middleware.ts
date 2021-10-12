import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const VALID_DOMAIN_LIST = ["nathanthomas.dev"];
if (process.env.DEV_ENV === "development") {
  VALID_DOMAIN_LIST.push(`localhost`);
}

function isValidDomain(req, res, next) {
  console.log(VALID_DOMAIN_LIST);
  if (VALID_DOMAIN_LIST.includes(req.hostname)) {
    next();
  } else {
    return res.status(421).send({
      message: "The request is not allowed.",
      success: false,
    });
  }
}

export default (server) => {
  server.use(express.json());
  server.use(cors());
  server.use(helmet());
  server.use(morgan("tiny"));
  server.use(isValidDomain);
};
