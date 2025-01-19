// View to display books based on User's favorite genre.
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../lib/queries";
import PropTypes from "prop-types";

const Recommendations = ({ user }) => {
  const result = useQuery(ALL_BOOKS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

  // Filter books based on the user's favorite genre
  const favoriteGenreBooks = books.filter((book) =>
    book.genres.includes(user.favoriteGenre)
  );

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{user.favoriteGenre}</b>
      </p>

      <table>
        <thead>
          <tr>
            <th>Book Title</th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {favoriteGenreBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Recommendations.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Recommendations;