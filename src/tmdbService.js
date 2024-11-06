// tmdbService.js
import axios from "axios";

// Replace with your TMDB API key
const API_KEY = "8bf433e4856105461ea85fcffa5a298e";
const BASE_URL = "https://api.themoviedb.org/3"; // Base URL for the TMDB API

// Create an axios instance with base URL and API key
const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Function to search for movies based on a query, with optional pagination
export const searchMovies = (query, page = 1) => {
  return tmdb.get(`/search/movie`, {
    params: {
      query,
      page, // Include page parameter for pagination
    },
  });
};

// Function to get trending movies, with optional pagination
export const getTrendingMovies = (page = 1) => {
  return tmdb.get(`/trending/movie/week`, {
    params: {
      page, // Include page parameter for pagination
    },
  });
};

// Function to get details of a specific movie by its ID
export const getMovieDetails = (movieId) => {
  return tmdb.get(`/movie/${movieId}`);
};

// Function to get all available movie genres
export const getGenres = () => {
  return tmdb.get(`/genre/movie/list`);
};

// Function to get movies by genre ID, with optional pagination
export const getMoviesByGenre = (genreId, page = 1) => {
  return tmdb.get(`/discover/movie`, {
    params: {
      with_genres: genreId,
      page, // Include page parameter for pagination
    },
  });
};
