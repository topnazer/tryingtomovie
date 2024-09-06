import React from "react";
import { Link } from "react-router-dom";
import './Moviecard.css';

function MovieCard({ movie }) {
  if (!movie) return null;

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
        <p className="movie-year">{movie.release_date?.split("-")[0]}</p>
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
