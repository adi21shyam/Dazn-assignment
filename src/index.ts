import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import movieRoute from "./routes/movie.route"
import searchRoute from "./routes/search.route"

dotenv.config();

 const app = express();
const PORT = process.env.PORT || 3000;
const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/movieLobby';

mongoose.connect(mongoUrl).then(()=> console.log("MongoDb is connected"));

app.use(express.json());

app.use('/movies', movieRoute);
app.use('/search', searchRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

export default app;