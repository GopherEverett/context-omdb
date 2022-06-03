import { useState, useContext } from 'react'
import './App.css';
import { MovieContext } from './context/movie-context'
import MovieList from './components/MovieList';
import useLocalStorage from 'use-local-storage'

function App() {

  const movieCtx = useContext(MovieContext)
  const { searchMovies } = movieCtx
  const [searchField, setSearchField] = useState("")
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light')
  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sessionStorage.setItem('search', searchField)
    searchMovies(searchField)
    setSearchField("")
  }


  return (
    <div className="App" data-theme={theme}>
      <button onClick={switchTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
      <h1>OMDB Search</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={e => setSearchField(e.target.value)} value={searchField} />
        <button type="submit">Search</button>
      </form>
      <MovieList searchField={searchField} setSearchField={setSearchField} />
    </div>
  );
}

export default App;
