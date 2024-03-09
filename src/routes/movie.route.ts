import express from 'express';
import { Movie } from '../models/movie.model';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// List all movies
router.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

// Add a new movie
router.post('/movies', authenticate, async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        genre: req.body.genre,
        rating: req.body.rating,
        streamingLink: req.body.streamingLink
    });

    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

// Update an existing movie's information
router.put('/movies/:id', authenticate, async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.json(updatedMovie);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

// Delete a movie
router.delete('/movies/:id', authenticate, async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.json({ message: "Movie deleted" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

export default router;
