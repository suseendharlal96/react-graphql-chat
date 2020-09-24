const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const express = require("express");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config");
const auth = require("./util/auth");

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: auth,
});

const app = express();
server.applyMiddleware({ app });
app.use(express.static("public"));

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    return app.listen({ port: PORT });
  })
  .then(() => {
    console.log("running");
  })
  .catch((err) => {
    console.log(err);
  });
