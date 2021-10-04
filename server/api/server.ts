import express from "express";
import applyMiddleware from "./middleware";
import { graphqlHTTP } from "express-graphql";
import schema from "../schema";

const server = express();

applyMiddleware(server);

server.use(
  "/graphql",
  graphqlHTTP({
    schema,
  })
);

export default server;
