import dotenv from 'dotenv'
import {Book} from '../models/Book.js'
import {Author} from '../models/Author.js'
import throwCustomError, {
  ErrorTypes,
} from '../helpers/error_handlers.helpers.js';

dotenv.config()

const resolvers = {
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
    
    authorCount: async (root, args, {currentUser}) => {
      if (!currentUser) {
        throwCustomError('Not authenticated', ErrorTypes.UNAUTHENTICATED)
      }
      return await Author.collection.countDocuments()
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

  },
  Mutation: {

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
   
  }
}

export default resolvers;