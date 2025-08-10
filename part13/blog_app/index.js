'use strict';
/** 
 * @fileoverview simple blog application entry point
 * This file initializes the blog application, sets up the main components,
 * and starts the application.
*/

const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const {PORT, SESSION_SECRET} = require('./utils/config')
const { requestLogger, info } = require('./middlewares/logger');
const { connectToDatabase, sequelize } = require('./utils/db');
const blogRouter = require('./routes/blogs');
const loginRouter = require('./routes/login');
const userRouter = require('./routes/users');
const authorRouter = require('./routes/authors');
const readingListsRouter = require('./routes/readinglists');

const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(requestLogger);

// Initialize session store
const sessionStore = new SequelizeStore({
  db: sequelize,
});

// Sync the session store table
sessionStore.sync();

app.use(session({
  secret: SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}));


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