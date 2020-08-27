import React from "react";

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider as Provider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:5000",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from store if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const ApolloProvider = (props) => <Provider client={client} {...props} />;

export default ApolloProvider;
