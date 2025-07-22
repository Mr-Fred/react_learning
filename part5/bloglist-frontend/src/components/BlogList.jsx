import React from 'react';
import { Link } from 'react-router';

const BlogList = ({ blogs }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">BLOGS</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.map((blog) => (
          <li key={blog.id} className="shadow rounded overflow-hidden">
            <div className="p-4 bg-gray-100 hover:bg-gray-200">
              <Link to={`/blogs/${blog.id}`} className="text-xl font-medium hover:underline">
                {blog.title}
              </Link>
              {/* <p className="text-gray-700 mt-2">{blog.description}</p> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;