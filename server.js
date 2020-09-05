const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config");

const PORT = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const dir = path.join(process.cwd(), "./images");
console.log(dir);
app.use(express.static(dir));
app.use("./images", express.static(dir));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (ctx) => ctx,
});

// server.listen().then(({ url }) => {
//   console.log("running at " + url);
// });

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log("running on", res.url);
  })
  .catch((err) => {
    console.log(err);
  });
