import express from 'express';
import { Movie } from '../models/movie.model';

const router = express.Router();


// Search for a movie by title or genre
router.get('/', async (req, res) => {
    const query = req.query.q;
    try {
        const movies = await Movie.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { genre: { $regex: query, $options: "i" } }
            ]
        });
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});


export default router;