/* eslint-disable no-undef */
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import context from './context/context.js';
import * as dotenv from 'dotenv'
import { typeDefs } from './schemas/typeDefs.js'
import { resolvers } from './resolvers/resolvers.js'
import mongoose from 'mongoose'

dotenv.config()
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: context
  }).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})