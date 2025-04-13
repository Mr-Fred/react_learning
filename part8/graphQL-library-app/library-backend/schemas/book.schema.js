import gql from 'graphql-tag';

const bookSchema = gql`
  type Query {
    bookCount: Int!
    allBooks(name: String, genre: String): [Book!]!
  }
  
  type Mutation {
    addBook(
      title: String!
      author: String!
      born: Int
      published: Int!
      genres: [String!]!
    ): Book
  }
  
  type Subscription {
    bookAdded: Book!
  }
`

export default bookSchema;