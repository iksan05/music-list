const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);