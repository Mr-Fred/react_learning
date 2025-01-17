import process from 'node:process'
import dotenv from 'dotenv'
dotenv.config()
import {Book} from '../models/Book.js'
import {Author} from '../models/Author.js'
import bcrypt from 'bcrypt'
import {User} from '../models/User.js'
import jwt from 'jsonwebtoken'
import throwCustomError, {
  ErrorTypes,
} from '../helpers/error_handlers.helpers.js';


export const resolvers = {
  Book: {
    author: async (root) => {
      try {
        const author = await Author.findOne({ name: root.author.name })
        // console.log('author:', author)
        return author
      } catch (error) {
        throwCustomError(`No author with name ${root.author} found`, ErrorTypes.BAD_USER_INPUT)
      }
      
    },
  },
  Author: {
    bookCount: async (root) => {
      try {
        return await Book.find({ author: root._id }).countDocuments()
      } catch (error) {
        throwCustomError(`No books with author ${root.author} found`, ErrorTypes.BAD_USER_INPUT)
      }
    }
  },
  Query: {
    bookCount: async (root, args, {currentUser}) => {
      if (!currentUser) {
        throwCustomError('Not authenticated', ErrorTypes.UNAUTHENTICATED);
      }
      return await Book.collection.countDocuments()
    },
    authorCount: async (root, args, {currentUser}) => {
      if (!currentUser) {
        throwCustomError('Not authenticated', ErrorTypes.UNAUTHENTICATED)
      }
      return await Author.collection.countDocuments()
    },
    allBooks: async (root, args, {currentUser}) => {
      if(!currentUser) {
        throwCustomError('Fetching books failed', ErrorTypes.BAD_REQUEST)
      }
      try {
        if (!args.name && !args.genre) {
          return await Book.find({}).populate('author', { name: 1, born: 1 } )
        }
        if (args.name && !args.genre) {
          return await Book.find({ name: args.name }).populate('author', { name: 1, born: 1 } )
        }
        if (args.name && args.genre) {
          return await Book.find({ name: args.name, genres: args.genre })
        }
        if (args.name) {
          return await Book.find({ name: args.name }).populate('author', { name: 1, born: 1 } )
        }
        if (args.genre) {
          return await Book.find({ genres: args.genre }).populate('author', { name: 1, born: 1 } )
        }
      } catch (error) {
        throwCustomError('Fetching books failed', ErrorTypes.BAD_USER_INPUT)
      }
    },
    allAuthors: async (root, args, {currentUser}) => {
      if(!currentUser){
        throwCustomError('Fetching authors failed', ErrorTypes.BAD_REQUEST)
      }
      try {
        return await Author.find({})
      } catch (error) {
        throwCustomError('Fetching autors failed', ErrorTypes.BAD_REQUEST)
      }
    },
    me: (root, args, {currentUser}) => {
      return currentUser
    },

  },
  Mutation: {
    addBook: async (root, args, {currentUser}) => {

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author, born: args.born ||null })
        try {
          await author.save()
        } catch (error) {
          throwCustomError('Saving author failed', ErrorTypes.BAD_USER_INPUT)
        }
      }
      const book = new Book(
        {
          title: args.title,
          published: args.published,
          author: author._id,
          genres: args.genres
        }
      )
      if(!currentUser) {
        throwCustomError('User is not Authenticated', ErrorTypes.UNAUTHENTICATED);
      }
      try {
        await book.save()
      } catch (error) {
        throwCustomError('Saving book failed', ErrorTypes.BAD_USER_INPUT)
      }
      return book
    },
    editAuthor: async (root, args, {currentUser}) => {
      if(!currentUser) {
        throwCustomError(
          'User is not Authenticated',
          ErrorTypes.UNAUTHENTICATED
        )
      }
      
      try {
        const updatedAuthor = await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          { new: true }
        )
        return updatedAuthor
      } catch (error) {
        throwCustomError('Updating author failed', ErrorTypes.BAD_USER_INPUT)
      }
    },
    createUser: async (root, args) => {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(args.password, saltRounds)
      const user = new User({
        username: args.username,
        password: passwordHash,
        favoriteGenre: args.favoriteGenre,

      })

        try {
          await user.save()
          return user
        } catch (error) {
          throwCustomError(
            'Creating user failed',
            ErrorTypes.BAD_USER_INPUT
          )
        }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(args.password, user.password)

      if (!(user && passwordCorrect)) {
        throwCustomError(
          'wrong credentials',
          ErrorTypes.BAD_USER_INPUT
        )
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return {
        username: user.username,
        favoriteGenre: user.favoriteGenre,
        token: jwt.sign(userForToken, process.env.SECRET)
      }
    },
    updateUser: async (root, args, {currentUser}) => {

      if(!currentUser) {
        throwCustomError(
          'User is not Authenticated',
          ErrorTypes.UNAUTHENTICATED
        )
      }
      const updatedInfo = {
        username: args.username,
        favoriteGenre: args.favoriteGenre
      }
      try {
        const userToUpdate = await User.findOneAndUpdate(
          { username: currentUser.username },
          updatedInfo,
          { new: true }
        )
        return userToUpdate
      } catch (error) {
        throwCustomError(
          'Updating user failed',
          ErrorTypes.BAD_USER_INPUT
        )
      }
    }
  }
}