import process from 'node:process'
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import throwCustomError, {
  ErrorTypes,
} from '../helpers/error_handlers.helpers.js';

dotenv.config();

// eslint-disable-next-line no-unused-vars
const context = async ({ req, res }) => {

  if (req.body.operationName === 'IntrospectionQuery') {
    // console.log('blocking introspection query..');
    return {};
  }
  // allowing the 'CreateUser' and 'Login' queries to pass without giving the token
  if (
    req.body.operationName === 'CreateUser' ||
    req.body.operationName === 'Login'
  ) {
    return {};
  }
  let decodedToken;
  // get the user token from the headers
  const auth = req? req.headers.authorization : null
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
  }
  const currentUser = await User.findById(decodedToken.id)

  if (!currentUser) {
    throwCustomError('User is not Authenticated', ErrorTypes.UNAUTHENTICATED);
  }

  // add the user to the context
  return { currentUser };
};

export default context;