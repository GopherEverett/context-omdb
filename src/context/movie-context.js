import { createContext, useState } from "react";
import axios from "axios";
const apikey = process.env.REACT_APP_API_KEY

export const MovieContext = createContext({
    movieList: null,
    searchMovies: () => { },
    pagination: () => { }
})

export const MovieContextProvider = ({ children }) => {
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)

    const handleSubmit = (search) => {
        axios.get(`http://www.omdbapi.com/?apikey=${apikey}&s=${search}`)
            .then(res => {
                if (res.data.Response === "False") {
                    setError(res.data.Error)
                } else {
                    setError(null)
                    setMovies(res.data.Search)
                }
            })
    }

    const handlePagination = (search) => {
        setPage(page + 1)
        axios.get(`http://www.omdbapi.com/?apikey=${apikey}&s=${search}&page=${page}`)
            .then(res => {
                if (res.data.Response === "False") {
                    setError(res.data.Error)
                } else {
                    setError(null)
                    setMovies([...movies, ...res.data.Search])
                }
            })
    }

    const contextValue = {
        movieList: movies,
        err: error,
        searchMovies: handleSubmit,
        pagination: handlePagination
    }

    return (
        <MovieContext.Provider value={contextValue}>
            {children}
        </MovieContext.Provider>
    )
}