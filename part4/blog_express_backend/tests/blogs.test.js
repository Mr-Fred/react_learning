const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    assert.strictEqual(result, 1);
  });
});

describe('Total likes', () => {
  test('of empty list is zero', () => {
    const blogs = [];

    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 0);
  });

  test('when list has only one blog equals the likes of that', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0,
      },
    ];
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });
  test('when list has many blogs equals the likes of that', () => {
    const blogs = [
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0,
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      },
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0,
      },
      {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0,
      },
    ];

    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 34);
  });
});

describe('Favorite Blog', () => {
  test('of empty list is {}', () => {
    const blogs = [];
    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, {});
  });

  test('when list has only one blog equals that blog', () => {
    const blogs = [
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0,
      },
    ];
    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(
      result,
      {
        title: 'React patterns',
        author: 'Michael Chan',
        likes: 7,
      },
    );
  });

  test('when list has many blogs equals the blog with more likes', () => {
    const blogs = [
      {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        likes: 10,
        __v: 0,
      },
      {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        likes: 15,
        __v: 0,
      },
    ];
    const result = listHelper.favoriteBlog(blogs);
    console.log(result);
    assert.deepStrictEqual(result, {
      title: 'First class tests',
      author: 'Robert C. Martin',
      likes: 15,
    });
  });
});

describe('Most Blogs', () => {
  test('of empty list is {}', () => {
    const blogs = [];
    const result = listHelper.mostBlogs(blogs);
    assert.deepStrictEqual(result, {});
  });

  test('when list has only one blog equals that blog', () => {
    const blogs = [
      { title: 'Blog 1', author: 'Robert C. Martin', likes: 10 },
    ];

    const result = listHelper.mostBlogs(blogs);
    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin',
      blogs: 1,
    });
  });

  test('when list has many blogs equals the blog with more blogs', () => {
    const blogs = [
      { title: 'Blog 1', author: 'Robert C. Martin', likes: 10 },
      { title: 'Blog 2', author: 'Robert C. Martin', likes: 15 },
      { title: 'Blog 3', author: 'Edsger W. Dijkstra', likes: 20 },
      { title: 'Blog 4', author: 'Robert C. Martin', likes: 5 },
      { title: 'Blog 5', author: 'Edsger W. Dijkstra', likes: 30 },
    ];

    const result = listHelper.mostBlogs(blogs);
    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });
});

describe('Most Likes', () => {
  test('of empty list is {}', () => {
    const blogs = [];
    const result = listHelper.mostLikes(blogs);
    assert.deepStrictEqual(result, {});
  });

  test('when list has only one blog equals that blog', () => {
    const blogs = [
      { title: 'Blog 1', author: 'Robert C. Martin', likes: 10 },
    ];

    const result = listHelper.mostLikes(blogs);
    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin',
      likes: 10,
    });
  });

  test('when list has many blogs equals the blog with more blogs', () => {
    const blogs = [
      { title: 'Blog 1', author: 'Robert C. Martin', likes: 10 },
      { title: 'Blog 2', author: 'Robert C. Martin', likes: 15 },
      { title: 'Blog 3', author: 'Edsger W. Dijkstra', likes: 20 },
      { title: 'Blog 4', author: 'Robert C. Martin', likes: 5 },
      { title: 'Blog 5', author: 'Edsger W. Dijkstra', likes: 30 },
    ];

    const result = listHelper.mostLikes(blogs);
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 30,
    });
  });
});
