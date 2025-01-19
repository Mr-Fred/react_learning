import {PubSub} from 'graphql-subscriptions'
import dotenv from 'dotenv'
import throwCustomError, {
  ErrorTypes,
} from '../helpers/error_handlers.helpers.js';
import {Book} from '../models/Book.js'
import {Author} from '../models/Author.js'

dotenv.config()
const pubsub = new PubSub();

const bookResolvers = {
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

  Query: {
    bookCount: async (root, args, {currentUser}) => {
      if (!currentUser) {
        throwCustomError('Not authenticated', ErrorTypes.UNAUTHENTICATED);
      }
      return await Book.collection.countDocuments()
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
  },

  Mutation: {
    addBook: async (root, args, {currentUser}) => {
      if(!currentUser) {
        throwCustomError('User is not Authenticated', ErrorTypes.UNAUTHENTICATED);
      }
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author, born: args.born || 0})
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
      try {
        await book.save()
      } catch (error) {
        throwCustomError('Saving book failed', ErrorTypes.BAD_USER_INPUT)
      }
      const newBook = await book.populate('author');
      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
      return newBook
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator(['BOOK_ADDED'])
    }
  }
}

export default bookResolvers;