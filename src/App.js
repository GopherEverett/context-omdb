import { useState, useContext } from 'react'
import './App.css';
import { MovieContext } from './context/movie-context'
import MovieList from './components/MovieList';

function App() {

  const movieCtx = useContext(MovieContext)
  const { searchMovies } = movieCtx

  // const [movies, setMovies] = useState(null)
  const [searchField, setSearchField] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchField("")
    searchMovies(searchField)
  }


  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={e => setSearchField(e.target.value)} value={searchField} />
        <button type="submit">Search</button>
      </form>
      <MovieList />
    </div>
  );
}

export default App;
