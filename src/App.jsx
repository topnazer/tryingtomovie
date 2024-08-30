import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // Import Router components
import MovieCard from "./MovieCard"; // Ensure you have a MovieCard component
import { searchMovies, getTrendingMovies } from "./tmdbService"; // Import TMDB service functions
import "./App.css";
import "./MovieCard.css";

// Define a simple Home component to reset the search and show trending movies
const Home = ({ setMovies, setSearchValue }) => {
  useEffect(() => {
    // Fetch trending movies when Home is loaded
    const fetchTrendingMovies = async () => {
      try {
        const response = await getTrendingMovies();
        setMovies(response.data.results); // Update state with trending movies
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchTrendingMovies();
  }, [setMovies]);

  return null; // This component only performs actions and does not need to render anything
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // Function to search for movies using TMDB service
  const fetchMovies = async (query) => {
    try {
      const response = await searchMovies(query);
      console.log(response.data.results); // Check the structure of the movie data
      setMovies(response.data.results); // Update state with fetched movies
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Fetch movies based on search value
  useEffect(() => {
    if (searchValue.trim() !== "") {
      fetchMovies(searchValue);
    } else {
      // If searchValue is empty, fetch trending movies
      const fetchTrendingMovies = async () => {
        try {
          const response = await getTrendingMovies();
          setMovies(response.data.results); // Update state with trending movies
        } catch (error) {
          console.error("Error fetching trending movies:", error);
        }
      };

      fetchTrendingMovies();
    }
  }, [searchValue]);
  return (
    <Router>
      <div className="app">
        {/* Navigation Bar with Links */}
        <header className="navbar">
          <Link to="/" onClick={() => setSearchValue("")}>
            Home
          </Link>
          {/* Other links can go here */}
          <a href="#">Movies</a>
          <a href="#">Anime</a>
          <a href="#">Genres</a>
          <a href="#">TV Shows</a>
        </header>

        <div className="header-section">
          <h1 className="app-title">Movie Kaba</h1>
        </div>

        <div className="search">
          <input
            placeholder="Search for movies"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)} // Update search value on input change
          />
          <button onClick={() => fetchMovies(searchValue)}>Search</button>{" "}
          {/* Fetch movies on search */}
        </div>

        {/* Display movies or a message if none are found */}
        {movies.length > 0 ? (
          <div className="movie-container">
            {movies.map((m) => (
              <MovieCard key={m.id} movie={m} /> // Render each movie card
            ))}
          </div>
        ) : searchValue.trim() !== "" ? (
          <div className="empty">
            <h4>No Movie Found!</h4>{" "}
            {/* Display message if no movies are found */}
          </div>
        ) : null}

        {/* Define routes for the application */}
        <Routes>
          <Route
            path="/"
            element={
              <Home setMovies={setMovies} setSearchValue={setSearchValue} />
            } // Home route to show trending movies
          />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
