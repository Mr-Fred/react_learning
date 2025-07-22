import gql from 'graphql-tag';

const userTypeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type UserWithToken {
    username: String!
    favoriteGenre: String!
    token: String!
  }
`

export default userTypeDefs;