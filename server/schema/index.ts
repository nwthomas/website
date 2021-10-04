import graphql from "graphql";
import Mutation from "./mutation";
import RootQuery from "./query";

const { GraphQLSchema } = graphql;

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
