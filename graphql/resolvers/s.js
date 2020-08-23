const { ApolloServer, gql } = require("apollo-server");

const libraries = [
  {
    branch: "downtown",
  },
  {
    branch: "riverside",
  },
];

// The branch field of a book indicates which library has it in stock
const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
    branch: "riverside",
  },
  {
    title: "Spiderman",
    author: "Peter Parker",
    branch: "riverside",
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton",
    branch: "downtown",
  },
];

// Schema definition
const typeDefs = gql`
  # A library has a branch and books
  type Library {
    branch: String!
    mybooks: [Book]!
  }
  # A book has a title and author
  type Book {
    title: String!
    myauthor: [Author]!
  }

  # An author has a name
  type Author {
    author: String!
    authorBooks: [Book]
  }

  # Queries can fetch a list of libraries
  type Query {
    libraries: [Library]!
  }
`;

// Resolver map
const resolvers = {
  Query: {
    libraries() {
      // Return our hardcoded array of libraries
      return libraries;
    },
  },
  Library: {
    mybooks(parent) {
      console.log(1, parent);
      // Filter the hardcoded array of books to only include
      // books that are located at the correct branch
      return books.filter((book) => book.branch === parent.branch);
    },
  },
  Book: {
    // The parent resolver (Library.books) returns an object with the
    // author's name in the "author" field. Return a JSON object containing
    // the name, because this field expects an object.
    myauthor(parent) {
      console.log(2, parent);
      const a = books.filter((book) => book.title === parent.title);
      return a;
    },
  },
  Author: {
    authorBooks(parent) {
      console.log(3, parent);
      return books.filter((book) => book.title === parent.title);
    },
  },

  // Because Book.author returns an object with a "name" field,
  // Apollo Server's default resolver for Author.name will work.
  // We don't need to define one.

  // Launch the server
};
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
