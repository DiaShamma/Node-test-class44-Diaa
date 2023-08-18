// movieRoutes.js
import express from "express";
import { addMovie, getMovieById, deleteMovie, getMoviesCount, getMovies } from "../controllers/movieController.js";

const router = express.Router();

router.post("/movie", addMovie);
router.get("/movie/:id", getMovieById);
router.delete("/movie/:id", deleteMovie);
router.get("/movies/count", getMoviesCount);
router.get("/movie", getMovies);
export default router;