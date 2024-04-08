import React, { useEffect, useState } from "react";
import axios from "../api";
import { useDispatch, useSelector } from "react-redux";
// react-redux 명령을 내리기 위한 Action 불러오기
import { MovieReducerActions } from "../redux/reducers/movieSlice";
import Banner from "../components/Banner";
import MovieSlide from "../components/MovieSlide";

// 로딩창 구현
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "auto auto",
  borderColor: "red",
};
const Home = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("white");
  const dispatch = useDispatch();
  const {popularMovies, topRatedMovies, upcomingMovies} = useSelector((state) => state.movie);
  // 3가지 종류의 영화목록을 묶어서 요청
  const getMovieList = async () => {
    const popularList = axios.get(`/movie/popular?language=en-US&page=1`);
    const topRatedList = axios.get(`/movie/top_rated?language=en-US&page=1`);
    const upcomingList = axios.get(`/movie/upcoming?language=en-US&page=1`);
    const genreList = axios.get(`/genre/movie/list?language=ko`);

    const [popular, topRated, upcoming, genre] = await Promise.all([
      popularList,
      topRatedList,
      upcomingList,
      genreList
    ]);
    // console.log(popular.data);
    // console.log(topRated.data);
    // console.log(upcoming.data);
    console.log('Home.jsx ganre', genre.data);
    dispatch(
      MovieReducerActions.initData({
        popular: popular.data,
        topRated: topRated.data,
        upcoming: upcoming.data,
        genre: genre.data
      })
    );
  };
  useEffect(() => {
    getMovieList();

    setLoading(false);

  }, []);

  // true : 데이터를 가져오기 전
  // false : 데이터를 가져온 후

  return (
    <div>
      {loading ? (
        <ClipLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div>
          <Banner movie={popularMovies}/>
          <h1>Popular Movie</h1>
          <MovieSlide  className="MovieSlide"movies={popularMovies} />
          <h1>Top Rated Movie</h1>
          <MovieSlide  className="MovieSlide"movies={topRatedMovies}/>
          <h1>Upcoming Movie</h1>
          <MovieSlide className="MovieSlide" movies={upcomingMovies}/>
        </div>
      )}
    </div>
  );
};

export default Home;
