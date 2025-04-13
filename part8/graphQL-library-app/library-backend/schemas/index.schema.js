import bookTypeDefs from './book.typedefs.js';
import authorTypeDefs from './author.typedefs.js';
import userTypeDefs from './user.typedefs.js';
import bookSchema from './book.schema.js';
import authorSchema from './author.schema.js';
import userSchema from './user.schema.js';

const typeDefs = [
  bookTypeDefs,
  authorTypeDefs,
  userTypeDefs,
  bookSchema,
  authorSchema,
  userSchema
]

export default typeDefs