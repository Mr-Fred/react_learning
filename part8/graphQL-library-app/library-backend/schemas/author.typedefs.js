import gql from 'graphql-tag';

const authorTypeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  
`

export default authorTypeDefs;