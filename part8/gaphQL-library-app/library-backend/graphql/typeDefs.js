
export const typeDefs = `
  type Authors {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Books {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  
  type User {
    username: String!
    password: String!
    favoriteGenre: String
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(name: String, genre: String): [Books!]!
    allAuthors: [Authors!]!
    me: User
  }
  
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Books!

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Authors
  }

  createUser(
    username: String!
    favoriteGenre: String!
    password: String!
  ): User

  login(
    username: String!
    password: String!
  ): Token
`