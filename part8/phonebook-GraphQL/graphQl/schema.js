
export const typeDefs =`
  type Address {
    street: String!
    city: String!
  }
  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }
  
  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person

    editNumber(
      name: String!
      phone: String!
    ): Person

    addAsFriend(
      name: String!
      phone: String!
    ): User

    createUser(
      username: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
  
  type Subscription {
    personAdded: Person!
  }    

  enum YesNo {
    YES
    NO
}
`