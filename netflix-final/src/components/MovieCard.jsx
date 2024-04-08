import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'

const MovieCard = ({ movie }) => {
  const navigate = useNavigate()
  const genres = useSelector((state) => state.movie.genreList)
  const divStyle = {
    backgroundImage: `url(https://www.themoviedb.org/t/p/original${movie?.poster_path})`,
  }
  const moveMovieDetail = () => {
    navigate(`/movies/${movie.id}`)
  }
  return (
    <div style={divStyle} className="moviecard">
      <div className="moviecard-info" onClick={moveMovieDetail}>
        <h3>{movie.title}</h3>
        <span></span>
        <div className="genre">
          {movie.genre_ids.map((item, index) => (
            <Badge bg="danger" key={index}>
              {genres.find((item2) => item2.id === item)?.name}
            </Badge>
          ))}
        </div>
        <span>
          ⭐{movie.vote_average} |{' '}
          {movie.adult === true ? '청소년 이용 불가' : '청소년 이용 가능'}
        </span>
      </div>
    </div>
  )
}

export default MovieCard
