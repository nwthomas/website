import graphql from "graphql";
import { MessageInputType } from "./types";

const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphql;

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    sendMessage: {
      type: MessageInputType,
      description: "Sends a message",
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
          description: "The name of the user sending the message",
        },
        email: {
          type: new GraphQLNonNull(GraphQLString),
          description: "The email of the user sending the message",
        },
        message: {
          type: new GraphQLNonNull(GraphQLString),
          description: "The message from the user",
        },
        fax: {
          type: GraphQLString,
          description: "A honeypot field to detect spam",
        },
      },
    },
  }),
});

export default Mutation;
