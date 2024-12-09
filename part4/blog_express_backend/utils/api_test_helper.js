const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const Blog = require('../models/Blog');
const Creator = require('../models/Creator');

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'test author',
  });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const populateCreatorsDb = async (creators) => {
  const createPromises = creators.map(async (creator) => {
    const passwordHash = await bcrypt.hash(creator.password, 10);
    const newCreator = new Creator({
      name: creator.name,
      username: creator.username,
      passwordHash,
    });
    await newCreator.save();
  });

  await Promise.all(createPromises); // Wait for all save operations to complete
};

const creatorsInDb = async () => {
  const creators = await Creator.find({});
  return creators.map((creator) => creator.toJSON());
};

const initialBlogs = [
  {
    title: 'Blog 1',
    author: 'Robert C. Martin',
    creator: new ObjectId('67562783ba14f4b1b41d432d'),
    likes: 10,
    id: '67550be22e8efb4a4f7433a6',
  },
  {
    title: 'Blog 3',
    author: 'Robert C. Martin',
    creator: new ObjectId('67562783ba14f4b1b41d432d'),
    likes: 5,
    id: '67550c242e8efb4a4f7433a9',
  },
  {
    title: 'Blog 5',
    author: 'Edsger W. Dijkstra',
    creator: new ObjectId('67562783ba14f4b1b41d432d'),
    likes: 3,
    id: '67550cb2c5defb9a987905c7',
  },
];

const initialCreators = [
  {
    name: 'John Doe',
    username: 'johndoe123',
    password: 'hashedpassword1',
  },
  {
    name: 'Alice Smith',
    username: 'alicesmith',
    password: 'hashedpassword2',
  },
  {
    name: 'Robert Brown',
    username: 'robbrown',
    password: 'hashedpassword3',
  },
  {
    name: 'Maria Johnson',
    username: 'mariajohn',
    password: 'hashedpassword4',

  },
  {
    name: 'Chris Taylor',
    username: 'christaylor',
    password: 'hashedpassword5',
  },
];

module.exports = {
  blogsInDb,
  populateCreatorsDb,
  creatorsInDb,
  nonExistingId,
  initialBlogs,
  initialCreators,
};
