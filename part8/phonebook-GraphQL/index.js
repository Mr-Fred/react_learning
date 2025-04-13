/* eslint-disable no-undef */
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import User from './models/User.js'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { makeExecutableSchema } from '@graphql-tools/schema'
import {WebSocketServer} from 'ws'
import {useServer} from 'graphql-ws/lib/use/ws'
import express from 'express'
import cors from 'cors'
import http from 'http'
import mongoose from 'mongoose'
import { resolvers } from './graphQl/resolvers.js'
import { typeDefs } from './graphQl/typeDefs.js'

mongoose.set('strictQuery', false)

const MONGODB_URI = process.env.MONGODB_URI
// const JWT_SECRET = process.env.SECRET


mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const serverCleanup = useServer({schema}, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        }
      }
    ],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
          const currentUser = await User.findById(decodedToken.id).populate(
            'friends'
          )
          return { currentUser }
        }
      },
    }),
  )
  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

start()