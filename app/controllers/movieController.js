import { movies } from "../models/movieModel.js";



// Get the list of movies
export const getMovies = (req, res) => {
  res.status(200).json(movies);
};

// Add a new movie
export const addMovie = (req, res) => {
  const movie = req.body;

  // Check if the required fields are provided
  const requiredFields = ["title", "director", "release_date"];
  const missingFields = requiredFields.filter((field) => !movie[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  // Remove any additional fields from the input
  const validFields = {
    title: movie.title,
    director: movie.director,
    release_date: movie.release_date,
  };

  // Generate a unique ID for the new movie
  const id = (movies.length + 1).toString();
  validFields.id = id; // Server generates the unique id

  // Add the new movie to the list
  movies.push(validFields);

  // Respond with a success message including the generated id
  res.status(201).json({ message: "Movie added successfully.", id: id });
};

// Get a movie by ID
export const getMovieById = (req, res) => {
  const id = req.params.id;

  const movie = movies.find((movie) => movie.id === id);

  if (!movie) {
    res.status(404).send("Movie not found");
    return;
  }

  res.status(200).json(movie);
};

// Delete a movie by ID
export const deleteMovie = (req, res) => {
  const id = req.params.id;

  // Check if a movie with the given ID exists
  const movieIndex = movies.findIndex((movie) => movie.id === id);
  if (movieIndex === -1) {
    return res
      .status(404)
      .json({ error: `Movie with id ${id} not found in the database.` });
  }

  // Remove the movie from the list
  movies.splice(movieIndex, 1);

  // Respond with a success message
  res.json({ message: `Movie with id ${id} has been deleted.` });
};

// Get movies count
export const getMoviesCount = (req, res) => {
  const movieCount = movies.length;
  res.status(200).json({ count: movieCount });
};