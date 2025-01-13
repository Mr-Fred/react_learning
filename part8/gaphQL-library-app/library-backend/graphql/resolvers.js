import process from 'node:process'
import dotenv from 'dotenv'
dotenv.config()
import Book from './models/Book'
import Author from './models/Author'
import { GraphQLError } from 'graphql'
import bcrypt from 'bcrypt'
import User from './models/User'
import jwt from 'jsonwebtoken'


export const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments,
    authorCount: () => Author.collection.countDocuments,
    allBooks: async (root, args) => {
      try {
        if (!args.name && !args.genre) {
          return await Book.find({})
        }
        if (args.name && args.genre) {
          return await Book.find({ name: args.name, genres: args.genre })
        }
        if (args.name) {
          return await Book.find({ name: args.name })
        }
        if (args.genre) {
          return await Book.find({ genres: args.genre })
        }
      } catch (error) {
        throw new GraphQLError('Fetching books failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error
          },
        })
      }
    },
    allAuthors: async () => {
      try {
        return await Author.find({})
      } catch (error) {
        throw new GraphQLError('Fetching authors failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error
          }
        })
      }
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Book: {
    author: async (root) => {
      try {
        return await Author.findOne({ name: root.author })
      } catch (error) {
        throw new GraphQLError('Fetching author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error
          }
        })
      }
    },
  },
  Authors: {
    bookCount: async (root) => {
      try {
        return await Book.find({ author: root.name }).countDocuments()
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'BAD_USER_INPUT',
            error
          }
        })
      }
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({ ...args })
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      return book
    },
    editAuthor: async (root, args) => {
      try {
        const updatedAuthor = await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          { new: true }
        )
        return updatedAuthor
      } catch (error) {
        throw new GraphQLError('Updating author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          },
        })
      }
    },
    createUser: async (root, args) => {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(args.password, saltRounds)
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
        password: passwordHash })

        try {
          await user.save()
          return user
        } catch (error) {
          throw new GraphQLError('Creating user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(args.password, user.password)

      if (!(user && passwordCorrect)) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.SECRET) }
    }
  }
}