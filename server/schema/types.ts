import graphql from "graphql";

const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } = graphql;

export const MessageInputType = new GraphQLInputObjectType({
  name: "Message",
  fields: () => ({
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
  }),
});
