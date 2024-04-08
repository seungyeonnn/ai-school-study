import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from '../api'
import { useDispatch, useSelector } from 'react-redux'
import { movieReducerActions } from '../redux/reducers/movieSlice'
import SearchMovieCard from '../components/SearchMovieCard'

const Movies = () => {
  const { state } = useLocation()
  const dispatch = useDispatch()
  const searchMovies = useSelector((state) => state.movie.searchList)

  useEffect(() => {
    const getSearchData = async () => {
      const res = await axios.get(
        `/search/movie?query=${state}&language=ko-KR&page=1`
      )
      dispatch(movieReducerActions.searchData(res.data.results))
    }
    getSearchData()
  }, [state, dispatch])
  return (
    <div className="movies">
      <p>'{state}' 검색 결과</p>
      {searchMovies.map((item) => (
        <SearchMovieCard key={item.id} movie={item} />
      ))}
    </div>
  )
}

export default Movies
