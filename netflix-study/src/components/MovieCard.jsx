import React, { useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import { useSelector } from "react-redux";

const MovieCard = ({ movies }) => {
  // movies가 정의되지 않았거나 빈 배열인 경우 처리
  const { genreList } = useSelector((state) => state.movie);
  console.log('MovieCard', genreList)

  return (
    <div>
      <div
        className="movie-slide-card"
        style={{
          backgroundImage: `url(https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${movies.poster_path})`,
        }}
      >
        <div className="movie-slide-hover">
          <h4>{movies.title}</h4>
          <div>
            {movies.genre_ids.map((item, id) => {
                const foundGenre = genreList.find((genre) => genre.id === item);
                return (
                  <h6 key={id} style={{ margin: "3px" }}>
                    <Badge bg="danger" text="light">
                      {foundGenre.name}
                    </Badge>
                  </h6>
                );
            })}
          </div>
          <div>
            <p>평점:{movies.vote_average} </p>
            <p> | </p>
            <p> {movies.adult ? "성인" : "청소년"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
