# Movie Lobby API

A RESTful API designed to manage a movie lobby for OTT applications, allowing operations such as listing all movies, searching for movies by title or genre, adding new movies, updating existing movie information, and deleting movies from the lobby. Built using Node.js, Express, TypeScript, and MongoDB.

## Features

- List all movies in the lobby
- Search for movies by title or genre
- Add new movies (requires admin role)
- Update existing movie information (requires admin role)
- Delete movies from the lobby (requires admin role)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- Node.js
- MongoDB
- npm or yarn

### Installing

A step by step series of examples that tell you how to get a development environment running:

1. Clone the repository
   ```sh
   git clone https://github.com/yourusername/movie-lobby-api.git
   ```
2. Install NPM packages
   ```sh
   cd movie-lobby-api
   npm install
   ``` 
3. Create a .env file in the root directory and add your MongoDB URI and any other environment variables you need:
   ```sh
   MONGODB_URI=mongodb://localhost:27017/movieLobby
   PORT=3000
   ```
4. Start the server
   ```sh
   npm start
   ```
