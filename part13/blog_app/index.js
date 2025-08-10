'use strict';
/** 
 * @fileoverview simple blog application entry point
 * This file initializes the blog application, sets up the main components,
 * and starts the application.
*/

const express = require('express');
const {PORT} = require('./utils/config')
const { requestLogger, info } = require('./middlewares/logger');
const { connectToDatabase } = require('./utils/db');
const blogRouter = require('./routes/blogs');
const loginRouter = require('./routes/login');
const userRouter = require('./routes/users');
const authorRouter = require('./routes/authors');
const readingListsRouter = require('./routes/readinglists');

const errorHandler = require('./middlewares/errorHandler');

const app = express();


app.use(express.json());
app.use(requestLogger);

app.get('/', (req, res) => {
  res.send('Welcome to the Blog API');
});
app.use('/user', loginRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/authors', authorRouter);
app.use('/api/readinglists', readingListsRouter);

app.use(errorHandler);


const start = async () => {
  await connectToDatabase();
  app.listen(PORT, function logStatus(){
    info(`Server running on port ${PORT}`)
  })
};

start();