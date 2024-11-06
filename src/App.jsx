import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import MovieDetails from "./MovieDetails";
import { searchMovies, getTrendingMovies, getGenres, getMoviesByGenre } from "./tmdbService";
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [page, setPage] = useState(1); // Page number state

  const fetchMovies = async (query, page = 1) => {
    try {
      const response = await searchMovies(query, page);
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchMoviesByGenre = async (genreId, page = 1) => {
    try {
      const response = await getMoviesByGenre(genreId, page);
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
    }
  };

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await getTrendingMovies(page);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await getGenres();
        setGenres(response.data.genres || []);
      } catch (error) {
        console.error("Error fetching genres:", error);
        setGenres([]);
      }
    };

    fetchGenres();

    // Fetch movies based on current search and selected genre with pagination
    if (searchValue.trim() !== "") {
      fetchMovies(searchValue, page);
    } else if (selectedGenre) {
      fetchMoviesByGenre(selectedGenre, page);
    } else {
      fetchTrendingMovies();
    }
  }, [searchValue, selectedGenre, page]);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <Router>
      <div className="bg-gray-900 min-h-screen text-white">
        {/* Header and Navigation */}
        <header className="bg-gray-800 p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Movie Ni MaMA Badeth</h1>
            <div className="flex gap-6">
              <Link to="/" onClick={() => { setSearchValue(""); setPage(1); }} className="nav-link">
                Home
              </Link>
              <a href="#" className="nav-link">Movies</a>
              <a href="#" className="nav-link">Anime</a>
              
              {/* Genre Dropdown */}
              <select
                className="genre-dropdown"
                onChange={(e) => { setSelectedGenre(e.target.value); setPage(1); }}
                value={selectedGenre || ""}
              >
                <option value="">Select Genre</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>

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
              onChange={(e) => { setSearchValue(e.target.value); setPage(1); }}
            />
            <button
              onClick={() => fetchMovies(searchValue, page)}
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
                <div className="pagination-controls flex justify-center mt-8">
                  <button
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-700 text-white rounded-l-full hover:bg-gray-600"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 bg-gray-800 text-white">{`Page ${page}`}</span>
                  <button
                    onClick={handleNextPage}
                    className="px-4 py-2 bg-gray-700 text-white rounded-r-full hover:bg-gray-600"
                  >
                    Next
                  </button>
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
