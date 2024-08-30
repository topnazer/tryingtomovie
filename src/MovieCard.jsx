import React from "react";
import "./MovieCard.css"; // Make sure you have this CSS file

function MovieCard({ movie }) {
  // Destructure movie from props
  if (!movie) return null; // Handle case where movie is undefined

  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="movie-poster"
      />
      <div className="movie-details">
        <h3>{movie.title}</h3><p>{movie.release_date?.split("-")[0]}</p>
      </div>
    </div>
  );
}

export default MovieCard;
