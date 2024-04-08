import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Badge from "react-bootstrap/Badge";
import axios from "../api";
import MovieReview from "../components/MovieReview";
import "../style/MovieDetail.css";

const MovieDetail = () => {
  const [movieInfo, setMovieInfo] = useState(null);
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const { genreList } = useSelector((state) => state.movie);
  console.log("MovieReviews.jsx genre 데이터 확인", genreList);

  console.log(id);

  const getReview = async () => {
    const response = await axios.get(
      `/movie/${id}/reviews?language=en-US?page=1`
    );
    setReviews(response.data.results);
  };
  console.log("MovieDetail.jsx 넘겨받은 영화 id", id);

  const getMovie = async () => {
    const response = await axios.get(`/movie/${id}?language=ko-KR`);
    setMovieInfo(response.data);
  };
  console.log("4차 데이터 응답. 데이터 꺼내오기 =", movieInfo);
  // console.log("5차 데이터 응답. 포스터 값 확인 =", movieInfo?.poster_path);

  const div_style = {
    // 객체?.속성명 : ?는 객체가 있을 때만 가져오는? 문법인 듯하다.
    src: `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movieInfo?.poster_path}`,
  };

  /** 분으로 받은 시간 값을 시 분 으로 나눠주는 함수 */
  const calculateMovieRunTime = (time) => {
    if (time < 60) {
      return time + " 분";
    }
    let hours = parseInt(time / 60);
    let min = parseInt(time - hours * 60);
    return hours + " 시간" + min + " 분";
  };

  useEffect(() => {
    getReview();
    getMovie();
    // setReviews(reviews.results)
  }, [id]);
  // console.log("MovieReviews.jsx reviews 데이터 확인", reviews);

  return (
    <div>
      <div className="moviedetail-container">
        <div className="moviedetail-left-container">
          {/* <div style={ div_style }></div> */}
          <div>
            {div_style ? (
              <img src={div_style.src} alt="" />
            ) : (
              <div className="poster-skelaton"></div>
            )}
          </div>
        </div>
        <div className="moviedetail-right-container">
          <div className="moviedetail-main-explanation">
            <div>
              {movieInfo?.genres.map((genre, id) => {
                return (
                  <h6 key={id} style={{ margin: "3px" }}>
                    <Badge bg="danger" text="light">
                      {genre.name}
                    </Badge>
                  </h6>
                );
              })}
            </div>
            <h1>{movieInfo ? movieInfo.title : "영화의 제목"}</h1>
            <span>{movieInfo ? movieInfo.tagline : "영화의 부연 설명"}</span>
          </div>
          <table>
            <tr>
              <td>출시일</td>
              <td>러닝타임</td>
              <td>평점</td>
              <td>청불여부</td>
            </tr>
            <tr>
              <td>{movieInfo ? movieInfo.release_date : "출시일"}</td>
              <td>
                {movieInfo
                  ? calculateMovieRunTime(movieInfo.runtime)
                  : "러닝타임"}
              </td>
              <td>{movieInfo ? movieInfo.vote_average : "평점"}</td>
              <td>
                {movieInfo
                  ? movieInfo.adult
                    ? "18세 미만"
                    : "청소년"
                  : "청불여부"}
              </td>
            </tr>
          </table>
          {/* <ul>
            <li>{movieInfo?movieInfo.release_date:'출시일'}</li>
            <li>{movieInfo?calculateMovieRunTime(movieInfo.runtime):'러닝타임'}</li>
            <li>{movieInfo?movieInfo.vote_average:'평점'}</li>
            <li>{movieInfo?(movieInfo.adult?"18세 미만":"청소년 관람 가능"):'청불여부'}</li>
          </ul> */}
          <div className="moviedetail-detailed-description-container">
            <hr></hr>
            <div>{movieInfo ? movieInfo.overview : "영화의 설명"}</div>
            <hr></hr>
          </div>
        </div>
      </div>
      <div className="moviereviews-container">
        <h3>영화 리뷰</h3>
        <hr></hr>
        {reviews.map((review, id) => (
          <MovieReview key={id} review={review} />
        ))}
      </div>
      {/* 후에 pagination으로 구현하고, 스크롤이 화면 끝까지 내려가면 자동으로 로딩되도록 수정해도 좋을 듯하다. */}
      <ul>
        <li></li>
      </ul>
    </div>
  );
};

export default MovieDetail;
