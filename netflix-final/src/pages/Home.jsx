import React, { useEffect, useState } from 'react'
import axios from '../api'
import { useSelector, useDispatch } from 'react-redux'
import { movieReducerActions } from '../redux/reducers/movieSlice'
import Banner from '../components/Banner'
import MovieSlide from '../components/MovieSlide'
// 개인 실습 컴포넌트
// import Banner2 from '../components/Banner2'
import CircleLoader from 'react-spinners/CircleLoader'
import MovieCard from '../components/MovieCard'

const Home = () => {
  // react-spinners용 state
  const [isLoading, setIsLoading] = useState(false)
  // redux 가져오기
  const dispatch = useDispatch()
  const popularMovies = useSelector((state) => state.movie.popularMovies)
  const topRatedMovies = useSelector((state) => state.movie.topRatedMovies)
  const upcomingMovies = useSelector((state) => state.movie.upcomingMovies)

  // 랜덤 배너용 랜덤 숫자
  const num = parseInt(Math.random() * 20)
  // 페이지 마운트 시, 데이터 불러오기
  useEffect(() => {
    const getMovieList = async () => {
      setIsLoading(true)
      const popularList = axios.get('/movie/popular?language=ko-KR&page=1')
      const topRatedList = axios.get('/movie/top_rated?language=ko-KR&page=1')
      const upcomingList = axios.get('/movie/upcoming?language=ko-KR&page=1')
      const genreList = axios.get('/genre/movie/list?language=ko')
      const [popular, topRated, upcoming, genres] = await Promise.all([
        popularList,
        topRatedList,
        upcomingList,
        genreList,
      ])
      dispatch(
        movieReducerActions.initData({
          popular: popular.data.results,
          topRated: topRated.data.results,
          upcoming: upcoming.data.results,
          genres: genres.data.genres,
        })
      )
      setIsLoading(false)
    }
    getMovieList()
  }, [dispatch])
  return (
    <div className="home">
      {isLoading ? (
        <CircleLoader loading={isLoading} color="white" size={150} />
      ) : (
        <Banner movie={popularMovies[num]} />
      )}
      <MovieSlide name="인기 영화" movies={popularMovies} />
      <MovieSlide name="TOP 20" movies={topRatedMovies} />
      <MovieSlide name="개봉 예정작" movies={upcomingMovies} />
      {/* 개인 */}
      {/* {isLoading ? (
        <CircleLoader loading={isLoading} color="white" size={150} className='loader'/>
      ) : (
        <Banner2 name="인기 영화" movies={popularMovies} />
      )}
      {isLoading ? (
        <CircleLoader loading={isLoading} color="white" size={150} />
      ) : (
        <Banner2 name="TOP 20" movies={topRatedMovies} />
      )}
      {isLoading ? (
        <CircleLoader loading={isLoading} color="white" size={150} />
      ) : (
        <Banner2 name="개봉 예정" movies={upcomingMovies} />
      )} */}
    </div>
  )
}

export default Home
