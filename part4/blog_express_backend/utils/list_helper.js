// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes;
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const reducer = (acc, curr) => (acc.likes > curr.likes ? acc : curr);

  const topBlog = blogs.reduce(reducer, blogs[0]);
  return {
    title: topBlog.title,
    author: topBlog.author,
    likes: topBlog.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const reducer = (acc, curr) => {
    acc[curr.author] = acc[curr.author] ? acc[curr.author] + 1 : 1;
    return acc;
  };

  const blogsCountByAuthor = blogs.reduce(reducer, {});

  const topAuthor = Object.keys(blogsCountByAuthor).reduce(
    (max, curr) => (blogsCountByAuthor[curr] > blogsCountByAuthor[max] ? curr : max),
  );

  return {
    author: topAuthor,
    blogs: blogsCountByAuthor[topAuthor],
  };
};

function mostLikes(blogs) {
  if (blogs.length === 0) {
    return {};
  }

  const reducer = (max, curr) => (max.likes > curr.likes ? max : curr);

  const mostLikedBlog = blogs.reduce(reducer);
  return {
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes,
  };
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
