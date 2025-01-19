import gql from 'graphql-tag';

const userSchema = gql`
  type Query {
    me: User
  }

  type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
      password: String!
    ): User

    updateUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): UserWithToken
  }
`

export default userSchema;