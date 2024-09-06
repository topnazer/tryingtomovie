import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "./tmdbService";
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await getMovieDetails(id);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details-container">
      <div className="movie-details">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
        <div className="movie-info">
          <h2 className="movie-title">{movie.title}</h2>
          <p className="movie-overview">{movie.overview}</p>
          <div className="movie-meta">
            <span><strong>Release Date:</strong> {movie.release_date}</span>
            <span><strong>Duration:</strong> {movie.runtime} mins</span>
            <span><strong>Genre:</strong> {movie.genres.map(genre => genre.name).join(", ")}</span>
            <span><strong>Rating:</strong> {movie.vote_average}/10</span>
          </div>
          <div className="server-links">
            <a
              href={`https://vidsrc.xyz/embed/movie?tmdb=${movie.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="server-link-btn"
            >
              Server 1
            </a>
            <a
              href={`https://vidsrc.xyz/embed/movie?tmdb=${movie.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="server-link-btn"
            >
              Server 2
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
