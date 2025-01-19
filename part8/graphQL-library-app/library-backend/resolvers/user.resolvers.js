import process from 'node:process'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import {User} from '../models/User.js'
import jwt from 'jsonwebtoken'
import throwCustomError, {
  ErrorTypes,
} from '../helpers/error_handlers.helpers.js';

dotenv.config()

const userResolvers = {
  Query: {
    me: (root, args, {currentUser}) => {
      return currentUser
    },
  },

  Mutation: {
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
    },
  }
}

export default userResolvers;