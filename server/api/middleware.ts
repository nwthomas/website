import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

export default (server) => {
  server.use(express.json());
  server.use(cors());
  server.use(helmet());
};
