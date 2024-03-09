import mongoose from 'mongoose';
import { Movie } from '../src/models/movie.model';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' }); // Ensure this points to your test env file

describe('Movie Model Tests', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI_TEST!);
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await Movie.deleteMany({});
    });

    it('should create & save movie successfully', async () => {
        const movieData = { title: 'Test Movie', genre: 'Test Genre', rating: 5 };
        const validMovie = new Movie(movieData);
        const savedMovie = await validMovie.save();
        
        expect(savedMovie._id).toBeDefined();
        expect(savedMovie.title).toBe(movieData.title);
    });

    // More tests...
});
