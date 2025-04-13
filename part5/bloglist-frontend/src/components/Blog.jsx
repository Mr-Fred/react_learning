import React, { useState } from 'react';
import { useUpdateBlog, useDeleteBlog } from "../features/useBlogs";
import CommentForm from './Comments';

const Blog = ({ blog, token }) => {
  const [fullBlog, setFullBlog] = useState(false);
  const { mutate: updateBlog } = useUpdateBlog();
  const { mutate: deleteBlog } = useDeleteBlog();

  const handleBlogView = () => {
    setFullBlog(!fullBlog);
  };

  const incrementLikes = () => {

    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    
    updateBlog({uB: updatedBlog, token: token});
    
  };

  const buttonLabel = fullBlog ? "hide details" : "view details";

  return (
    <div className="bg-white rounded shadow-md p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">{blog.title}</h3>
        <button
          onClick={handleBlogView}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {buttonLabel}
        </button>
      </div>
      <div className={fullBlog ? "block mt-4" : "hidden"}>
        <p className="text-gray-700">Url: {blog.url}</p>
        <div className="flex items-center mt-2">
          <p className="text-gray-700 mr-2">Likes: {blog.likes}</p>
          <button onClick={incrementLikes} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
            like
          </button>
        </div>
        <p className="text-gray-700 mt-2">Added by: {blog.creator.name}</p>
        <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right mt-4"
        onClick={() => deleteBlog({ id: blog.id, token })}
      >
        remove
      </button>
      </div>
      <br />
      <hr className="mt-8" />
      <CommentForm blog={blog} token={token} />
    </div>
  );
};

export default Blog;