const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config");

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// server.listen().then(({ url }) => {
//   console.log("running at " + url);
// });

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log("running on", res.url);
  })
  .catch((err) => {
    console.log(err);
  });
