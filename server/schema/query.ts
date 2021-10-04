import graphql from "graphql";

const { GraphQLObjectType } = graphql;

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {},
});

export default RootQuery;
