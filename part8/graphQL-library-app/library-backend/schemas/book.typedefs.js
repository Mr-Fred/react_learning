import gql from 'graphql-tag';

const bookTypeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  
`

export default bookTypeDefs;