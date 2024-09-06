import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import MovieDetails from "./MovieDetails";
import { searchMovies, getTrendingMovies } from "./tmdbService";
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const fetchMovies = async (query) => {
    try {
      const response = await searchMovies(query);
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await getTrendingMovies();
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };
    if (searchValue.trim() !== "") {
      fetchMovies(searchValue);
    } else {
      fetchTrendingMovies();
    }
  }, [searchValue]);

  return (
    <Router>
      <div className="bg-gray-900 min-h-screen text-white">
        {/* Header and Navigation */}
        <header className="bg-gray-800 p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Movie Kaba</h1>
            <div className="flex gap-6">
              <Link to="/" onClick={() => setSearchValue("")} className="nav-link">
                Home
              </Link>
              <a href="#" className="nav-link">Movies</a>
              <a href="#" className="nav-link">Anime</a>
              <a href="#" className="nav-link">Genres</a>
              <a href="#" className="nav-link">TV Shows</a>
            </div>
          </nav>
        </header>

        {/* Search Input */}
        <div className="container mx-auto my-8">
          <div className="search-bar flex justify-center">
            <input
              className="border border-gray-300 p-3 rounded-l-full text-black w-3/4 md:w-1/2"
              placeholder="Search for movies"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
              onClick={() => fetchMovies(searchValue)}
              className="bg-orange-500 text-white px-6 py-3 rounded-r-full hover:bg-orange-600 transition"
            >
              Search
            </button>
          </div>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <div className="container">
                <div className="movie-grid">
                  {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              </div>
            }
          />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
