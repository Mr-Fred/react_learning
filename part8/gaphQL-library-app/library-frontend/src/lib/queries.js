import { gql } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
  query fetchBooks($authorName: String, $genre: String) {
    allBooks(name: $authorName, genre: $genre) {
      title
      published
      author{
        name
      }
      genres
    }
  }
`

const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $born: Int, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    born: $born,
    published: $published,
    genres: $genres
  ) {
    title
  }
}
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!, $favoriteGenre: String!) {
    createUser(username: $username, password: $password, favoriteGenre: $favoriteGenre) {
      username
      favoriteGenre
    }
  }
`

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      favoriteGenre
      token
    }
  }
`

const UPDATE_USER= gql`
  mutation UpdateUser($username: String!, $favoriteGenre: String!) {
    updateUser(username: $username, favoriteGenre: $favoriteGenre) {
      username
      favoriteGenre
    }
  }
`

export {
  ALL_AUTHORS,
  ALL_BOOKS,
  ADD_BOOK,
  EDIT_AUTHOR,
  CREATE_USER,
  LOGIN,
  UPDATE_USER
}