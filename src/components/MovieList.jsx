import { useContext } from 'react'
import { MovieContext } from '../context/movie-context'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';

const MovieList = ({ searchField }) => {
  const movieCtx = useContext(MovieContext)
  const { movieList, err, pagination } = movieCtx
  const fallBackUrl = "http://www.movienewsletters.net/photos/000000H1.jpg"
  const handlePagination = (e) => {
    console.log(searchField)
    e.preventDefault()
    pagination(sessionStorage.getItem('search'))
  }

  return (
    <div className="App">
      {err ?
        <h2>{err} Try another search</h2>
        :
        <div>
          <div className="movieList">
            {movieList?.map((movie, i) => (
              <div key={i} className="movieCard">
                <a href={movie.Poster}>
                  <LazyLoadImage
                    src={movie.Poster}
                    alt="movie poster"
                    effect="blur"
                    onError={(e) => (e.currentTarget.src = fallBackUrl)}
                  />
                </a>
                <h2 key={i}>{movie.Title}</h2>
                <h3>{movie.Year}</h3>
              </div>
            ))}
          </div>
          <button onClick={handlePagination}>more</button>
        </div>
      }
    </div>
  )
}

export default MovieList