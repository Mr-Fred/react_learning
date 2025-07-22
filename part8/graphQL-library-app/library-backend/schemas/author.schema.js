import gql from 'graphql-tag';

const authorSchema = gql`
  type Query {
    authorCount: Int!
    allAuthors: [Author!]!
  }
  
  type Mutation {
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
  
`

export default authorSchema;