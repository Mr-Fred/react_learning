import React from 'react';
import { useField } from "../reducers/inputField";
import { useFetchComments, useAddComment } from '../features/useComments';

const CommentForm = ({ blog, token }) => {
  const comment = useField("textbox");
  const { data: comments } = useFetchComments(blog.id, token);
  const { mutate: addComment } = useAddComment();

  const handleComment = (event) => {
    event.preventDefault();
    addComment({ id: blog.id, token, comment: comment.value });
    comment.reset();
  };

  return (
    <div className="shadow rounded overflow-hidden mt-4">
      <div className="px-4 py-3 bg-gray-800 text-white">
        <h2>Comments</h2>
      </div>
      <form onSubmit={handleComment} className="px-4 py-4">
        <p>
          <label htmlFor="comment" className="text-gray-300">
            Enter your comment below:
          </label>
        </p>
        <textarea
          id="comment"
          rows="4"
          cols="50"
          className="w-full rounded-md border border-gray-300 px-2 py-2"
          {...comment.inputProps}
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
          Add Comment
        </button>
      </form>
      <ul className="list-none px-4 py-4">
        {comments?.map((comment) => (
          <li key={comment.id} className="mb-2">
            <p className="text-gray-700">{comment.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentForm;