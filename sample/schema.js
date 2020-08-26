const books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "1" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" },
  { name: "Half Girlfriend", genre: "Romance", id: "4", authorId: "2" },
];

const authors = [
  { name: "J.K Rowling", age: "50", id: "1" },
  { name: "Chetan Bhagat", age: "40", id: "2" },
  { name: "Shakespeare", age: "100", id: "3" },
];

// METHOD 1 -> using traditional graphql method
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLString,
} = require("graphql");

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    genre: {
      type: GraphQLString,
    },
    author: {
      type: AuthorType,
      resolve: (parent, args) => {
        return authors.find((a) => a.id === parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLString,
    },
    book: {
      type: BookType,
      resolve: (parent, args) => {
        return books.find((b) => b.authorId === parent.id);
      },
    },
  }),
});

const query = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    book: {
      type: new GraphQLList(BookType),
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve: (parent, args) => {
        // return books.filter((b) => b.id === args.id);
        return books;
      },
    },
    author: {
      type: new GraphQLList(AuthorType),
      resolve: (_, __) => {
        return authors;
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addBook: {
      type: new GraphQLList(BookType),
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        id: { type: GraphQLString },
        authorId: { type: GraphQLString },
      },
      resolve: (parent, { name, genre, id, authorId }) => {
        books.push({ name, genre, id, authorId });
        return books;
      },
    },
  },
});

exports.schema = new GraphQLSchema({
  query,
  mutation,
});

// METHOD 2 -> using buildschema method

// const { buildSchema } = require("graphql");

// exports.schema = buildSchema(`
// type BookType{
//   id: String!
//   name:String!
//   genre:String!
//   myauthor:AuthorType!
// }

// type AuthorType{
//   id:String!
//   name:String!
//   age:ID!
//   mybook:BookType!
// }

// type Query{
//   book: [BookType]!
//   author: [AuthorType]!
// }

// schema{
//   query:Query
// }

// `);

// exports.resolver = {
//   Query: {
//     book: () => books,
//     author: () => authors,
//   },
//   Mutation: {
//     addBook: (_, { id, name, genre, authorId }) => {
//       books.push({ id, name, genre, authorId });
//       return books;
//     },
//   },
//   BookType: {
//     name: (parent) => {
//       return "hahaha";
//     },
//     author: (parent, args) => {
//       console.log(1, parent, args);
//       return authors.find((a) => a.id === parent.authorId);
//     },
//   },
//   AuthorType: {
//     book: (parent, args) => {
//       console.log(2, parent, args);
//       return books.find((a) => a.authorId === parent[0].id);
//     },
//   },
// };

// METHOD 3 -> using apollographql method

// const { gql } = require("apollo-server");

// exports.typeDefs = gql`
//   type BookType {
//     id: String!
//     name: String!
//     genre: String!
//     author: AuthorType!
//   }

//   type AuthorType {
//     id: String!
//     name: String!
//     age: ID!
//     book: BookType!
//   }

//   type Query {
//     book: [BookType]!
//     author: [AuthorType]!
//   }
//   type Mutation {
//     addBook(
//       name: String!
//       genre: String!
//       id: String!
//       authorId: String!
//     ): [BookType]!
//   }
// `;
