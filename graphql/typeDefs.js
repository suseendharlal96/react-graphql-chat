const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    username: String!
    email: String!
    token: String!
  }
  input SignupData {
    username: String!
    email: String!
    password: String!
    confirmpassword: String!
  }

  type Query {
    getUsers: [User]!
    getUser(username: String!): User!
  }

  type Mutation {
    signup(signupInput: SignupData): User!
    signin(email: String!, password: String!): User!
  }
`;
