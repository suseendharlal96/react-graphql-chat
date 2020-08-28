const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    username: String!
    email: String!
    token: String!
  }
  type Message {
    uuid: String!
    content: String!
    to: String!
    from: String!
    createdAt: String!
  }
  type MyUser {
    username: String!
    mycompany: [Company]!
  }
  type Company {
    sname: String!
    usernamez: String!
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
    confirmPassword: String!
  }

  type SongType {
    id: ID!
    title: String!
    lyrics: [LyricType]!
  }

  type LyricType {
    id: ID!
    likes: Int!
    content: String!
    song: SongType!
  }

  type Query {
    getUsers: [User]!
    getMyUsers: [MyUser]!
    getMyUser(username: String!): MyUser!
    signin(email: String!, password: String!): User!
    getMessages(from: String!): [Message]!
    songs: [SongType]!
    song(id: ID!): SongType
    lyric(id: ID!): LyricType
  }

  type Mutation {
    signup(signupInput: SignupData): User!
    sendMessage(content: String!, to: String!): Message!
    addSong(title: String!): SongType
    addLyricToSong(content: String!, songId: ID!): SongType!
    deleteSong(songId: ID!): String!
  }
`;
