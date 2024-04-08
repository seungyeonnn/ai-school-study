import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from '../api'
import { movieReducerActions } from '../redux/reducers/movieSlice'
import Badge from 'react-bootstrap/Badge'
import CircleLoader from 'react-spinners/CircleLoader'

const MovieDetail = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [reviews, setReviews] = useState([])
  // redux 가져오기
  const detailData = useSelector((state) => state.movie.detailData)
  const dispatch = useDispatch()
  // 데이터 마운트
  useEffect(() => {
    const getDetailData = async () => {
      setIsLoading(true)
      const res = await axios.get(`/movie/${id}?language=ko-KR`)
      // console.log(res.data)
      dispatch(movieReducerActions.detailData(res.data))
      setIsLoading(false)
    }
    getDetailData()
    getReviews()
  }, [id, dispatch])

  // 리뷰 데이터
  const getReviews = async () => {
    let res = await axios.get(`movie/${id}/reviews?language=en-US&page=1`)
    console.log(res.data.results)
    setReviews(res.data.results)
  }
  return (
    <div className="name">
      {isLoading ? (
        <CircleLoader loading={isLoading} color="white" size={150} />
      ) : (
        <div className="movie-detail">
          <div className="movie-detail-img">
            <img
              src={`https://www.themoviedb.org/t/p/original${detailData?.poster_path}`}
              alt=""
              width="400px"
            />
          </div>
          <div className="movie-detail-info">
            <div className="genre">
              {detailData.genres?.map((item, index) => (
                <h4 key={index}>
                  <Badge bg="danger">{item.name}</Badge>
                </h4>
              ))}
            </div>
            <h1>{detailData.title}</h1>
            <p>{detailData.tagline}</p>
            <p>
              개봉일 : {detailData.release_date} | 평점 :{' '}
              {detailData.vote_average} |{' '}
              {detailData.adult ? '청소년 관람 불가' : '18세 미만'}
            </p>
            <p
              style={{
                borderTop: '3px solid whitesmoke',
                borderBottom: '3px solid whitesmoke',
                padding: '30px 0',
                width: '100%',
              }}
            >
              {detailData.overview}
            </p>
          </div>
        </div>
      )}
      {/* 리뷰영역  */}

      <div className="review-box">
        {reviews.map((item) => (
          <div className="review-item">
            <h4>{item.author}</h4>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MovieDetail
