// Display a grid of genres used to filter books.
import PropTypes from 'prop-types'

const GenresFilter = ({ uniqueGenres, selectedGenre, setSelectedGenre }) => {

  return (
  <div style={{ marginTop: "20px" }}>
    {uniqueGenres.map((genre) => (
      <button
        key={genre}
        onClick={() => setSelectedGenre(genre)}
        style={{
          margin: "5px",
          padding: "5px 10px",
          background: selectedGenre === genre ? "#ccc" : "#f0f0f0",
        }}
      >
        {genre}
      </button>
    ))}
    <button
      onClick={() => setSelectedGenre(null)}
      style={{
        margin: "5px",
        padding: "5px 10px",
        background: !selectedGenre ? "#ccc" : "#f0f0f0",
      }}
    >
      all genres
    </button>
  </div>
  )
}

GenresFilter.propTypes = {
  uniqueGenres: PropTypes.array.isRequired,
  selectedGenre: PropTypes.string,
  setSelectedGenre: PropTypes.func.isRequired,
}


export default GenresFilter
