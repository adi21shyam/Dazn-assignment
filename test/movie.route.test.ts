import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/index'; // Update this path to your actual Express app
import { Movie } from '../src/models/movie.model';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

describe('Movie Routes Tests', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI_TEST!);})

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await Movie.deleteMany({});
    });

    it('GET /movies - should return all movies', async () => {
        const movies = [{ title: 'Movie One', genre: 'Genre One', rating: 4 }];
        await Movie.insertMany(movies);

        const res = await request(app).get('/movies');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].title).toBe(movies[0].title);
    });

    it('POST /movies - Should create a new movie', async () => {
        const newMovie = {
            title: 'Inception',
            genre: 'Sci-Fi',
            rating: 8.8,
            streamingLink: 'http://example.com/inception'
        };

        const response = await request(app)
            .post('/movies')
            .send(newMovie);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newMovie.title);
        expect(response.body.genre).toBe(newMovie.genre);
        expect(response.body.rating).toBe(newMovie.rating);
        expect(response.body.streamingLink).toBe(newMovie.streamingLink);
    });

    // PUT - Update an existing movie
    it('PUT /movies/:id - Should update the movie info', async () => {
        const movie = await new Movie({
            title: 'The Matrix',
            genre: 'Sci-Fi',
            rating: 9.0,
            streamingLink: 'http://example.com/thematrix'
        }).save();

        const updatedInfo = {
            title: 'The Matrix Revolutions',
            genre: 'Action',
            rating: 6.8,
            streamingLink: 'http://example.com/thematrixrevolutions'
        };

        const response = await request(app)
            .put(`/movies/${movie.id}`)
            .send(updatedInfo);

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(updatedInfo.title);
        expect(response.body.genre).toBe(updatedInfo.genre);
        expect(response.body.rating).toBe(updatedInfo.rating);
        expect(response.body.streamingLink).toBe(updatedInfo.streamingLink);
    });

    // DELETE - Remove a movie
    it('DELETE /movies/:id - Should delete the movie', async () => {
        const movie = await new Movie({
            title: 'The Dark Knight',
            genre: 'Action',
            rating: 9.0,
            streamingLink: 'http://example.com/thedarkknight'
        }).save();

        const response = await request(app)
            .delete(`/movies/${movie.id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: "Movie deleted" });

        const deletedMovie = await Movie.findById(movie.id);
        expect(deletedMovie).toBeNull();
    });
});
