import React, { useEffect, useState } from "react";
import axios from "../api";

const MovieReview = ({ review }) => {
  //   useEffect(() => {
  //     getReview();
  //     setReviews(reviews.results)
  //     console.log("MovieReviews.jsx reviews 데이터 확인", reviews);
  //   }, [id]);
  return (
    <div className="moviereviews-review-item">
      <h5>{review.author}</h5>
      <span>{review.content}</span>
      <hr></hr>
    </div>
  );
};

export default MovieReview;
