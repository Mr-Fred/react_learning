import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../lib/queries"
import GenresFilter from "./GenresFilter"
import { useState } from "react"



const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data?.allBooks || []

  // Extract unique genres from the books data
  const uniqueGenres = [...new Set(books.flatMap((book) => book.genres))];
  
  // Filter books based on the selected genre
  const handleGenreSelection = (genre) => {
    setSelectedGenre(genre);
    result.refetch({ genre }); // Refetch books with the selected genre
  };

  {selectedGenre && <p>in genre <b>{selectedGenre}</b></p>}
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>Book Title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <GenresFilter
        uniqueGenres={uniqueGenres}
        selectedGenre={selectedGenre}
        setSelectedGenre={handleGenreSelection}
      />
    </div>
  )
}

export default Books