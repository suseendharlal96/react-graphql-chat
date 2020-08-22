const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    username: String!
    email: String!
    token: String!
  }
  type MyUser {
    username: String!
    mycompany: [Company]!
  }
  type Company {
    sname: String!
    usernamez:String!
    myhome: Home!
  }
  type Home {
    name: String!
    myfactory: Factory!
  }
  type Factory {
    name: String!
  }
  input SignupData {
    username: String!
    email: String!
    password: String!
    confirmpassword: String!
  }

  type Query {
    getUsers: [User]!
    getMyUsers: [MyUser]!
    getMyUser(username: String!): MyUser!
  }

  type Mutation {
    signup(signupInput: SignupData): User!
    signin(email: String!, password: String!): User!
  }
`;
