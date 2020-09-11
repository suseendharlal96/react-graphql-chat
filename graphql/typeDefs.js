const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    username: String!
    email: String!
    token: String!
    imageUrl: String!
    id: ID!
    latestMessage: Message
  }
  type Message {
    uuid: String!
    content: String!
    to: String!
    from: String!
    createdAt: String!
  }
  type Reaction {
    content: String!
    uuid: String!
    message: Message!
    createdAt:String!
    user: User!
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
    imageUrl: String!
  }

  type SongType {
    id: ID!
    title: String!
    user: User!
    lyrics: [LyricType]!
  }

  type LyricType {
    id: ID!
    likes: [String]!
    content: String!
    song: SongType!
  }

  type File {
    id: ID!
    filename: String!
    mimetype: String!
    path: String!
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
    files: [File!]
  }

  type Mutation {
    signup(signupInput: SignupData): User!
    sendMessage(content: String!, to: String!): Message!
    addSong(title: String!): SongType
    addLyricToSong(content: String!, songId: ID!): SongType!
    likeLyric(lyricId: ID!): LyricType!
    deleteSong(songId: ID!): String!
    uploadFile(file: Upload!): File
    reactToMessage(uuid: String!, content: String!): Reaction!
  }

  type Subscription {
    songAdded: SongType!
    messageSent: Message!
    reacted: Reaction!
  }
`;
