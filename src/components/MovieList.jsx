import { useContext, Fragment } from 'react'
import { MovieContext } from '../context/movie-context'

const MovieList = () => {
  const movieCtx = useContext(MovieContext)
  const { movieList } = movieCtx

  return (
    <div className="App">
      {movieList?.map((movie, i) => (
        <Fragment key={i}>
          <a href={movie.Poster}>
            <img src={movie.Poster} alt="movie poster" />
          </a>
          <h2 key={i}>{movie.Title}</h2>
          <h3>{movie.Year}</h3>
        </Fragment>
      ))}
    </div>
  )
}

export default MovieList