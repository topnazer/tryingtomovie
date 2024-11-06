// MovieCard.js
import React from "react";
import { Link } from "react-router-dom";
import './Moviecard.css';

function MovieCard({ movie }) {
  if (!movie) return null;

  const quality = movie.vote_average >= 7 ? "HD" : "CAM";
  const rating = movie.vote_average || "N/A";

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
      </Link>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-details">
          <span className="movie-rating">
            <i className="fa fa-star" aria-hidden="true"></i> {rating}
          </span>
          <span className="movie-quality">{quality}</span>
          <span className="movie-year">{movie.release_date?.split("-")[0]}</span>
        </div>
        <Link
          to={`/movie/${movie.id}`}
          className="watch-now-btn"
        >
          Watch now
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;
