// USING NORMAL GRAPHQL method

const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const { schema, resolver } = require("./schema");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    // rootValue: resolver, // if you're using buildSchema method
    graphiql: true,
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("listening on ", PORT);
});

// USING APOLLO GRAPHQL

// const { ApolloServer } = require("apollo-server");

// const { resolver, typeDefs } = require("./schema");

// const server = new ApolloServer({
//   typeDefs,
//   resolvers: resolver,
// });

// server.listen().then(({ url }) => {
//   console.log("listening on", url);
// });
