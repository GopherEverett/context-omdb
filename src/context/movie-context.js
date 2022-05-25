import { createContext, useState } from "react";
import axios from "axios";
const apikey = process.env.REACT_APP_API_KEY

export const MovieContext = createContext({
    movieList: null,
    searchMovies: () => { }
})

export const MovieContextProvider = ({ children }) => {
    const [movies, setMovies] = useState([])

    const handleSubmit = (search) => {
        axios.get(`http://www.omdbapi.com/?apikey=${apikey}&s=${search}`)
            .then(res => setMovies(res.data.Search))
    }

    const contextValue = {
        movieList: movies,
        searchMovies: handleSubmit
    }

    return (
        <MovieContext.Provider value={contextValue}>
            {children}
        </MovieContext.Provider>
    )
}