import React from 'react';
import { useField } from "../reducers/inputField";
import { useCreateBlog } from "../features/useBlogs";
import { useSelector } from "react-redux";

const BlogForm = () => {
  const newTitle = useField("text", "title");
  const newAuthor = useField("text", "author");
  const newUrl = useField("text", "url");
  const newLikes = useField("number", "likes");
  const token = useSelector((state) => state.user.token);

  const { mutate: createBlog } = useCreateBlog();

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      nB: {
        title: newTitle.value,
        author: newAuthor.value,
        url: newUrl.value,
        likes: newLikes.value,
      },
      token: token,
    });
    newTitle.reset();
    newAuthor.reset();
    newUrl.reset();
    newLikes.reset();
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>
      <form onSubmit={addBlog} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title:
          </label>
          <input
            id="title"
            type="text"
            required
            className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            {...newTitle.inputProps}
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">
            Author:
          </label>
          <input
            id="author"
            type="text"
            required
            className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            {...newAuthor.inputProps}
          />
        </div>
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">
            Url:
          </label>
          <input
            id="url"
            type="text"
            className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            {...newUrl.inputProps}
          />
        </div>
        <div>
          <label htmlFor="likes" className="block text-sm font-medium text-gray-700">
            Likes:
          </label>
          <input
            id="likes"
            type="number"
            className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            {...newLikes.inputProps}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;