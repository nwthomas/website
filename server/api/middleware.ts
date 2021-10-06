import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const VALID_DOMAIN_LIST = [
  `localhost:${process.env.PORT || 8000}`,
  "nathanthomas.dev",
];

function isValidDomain(req, res, next) {
  console.log(req.get("host"), VALID_DOMAIN_LIST);
  if (VALID_DOMAIN_LIST.includes(req.get("host"))) {
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
