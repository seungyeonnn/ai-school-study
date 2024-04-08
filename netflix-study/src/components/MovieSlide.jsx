import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../style/Banner.css";
import MovieCard from "./MovieCard";

const MovieSlide = ({ movies }) => {
  console.log("MovieSlide.jsx", movies);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
    <Carousel responsive={responsive}>
      {movies && movies.length > 0 ? (
        movies.map((item, id) => (
          <MovieCard movies={item} key={id} />
        ))
      ) : (
        <div>No movies to display.</div>
      )}
    </Carousel>
  </div>
  );
};

export default MovieSlide;
