const mongoose = require("mongoose");
const Movie = require("./Movie");

mongoose.connect("mongodb://localhost:27017/MovieProject");

async function createMovie(title, genre, director, rating) {
  const newMovie = await Movie.create({
    title,
    genre,
    director,
    rating,
  });
  mongoose.disconnect();
  return newMovie;
}

async function findMovie(title) {
  const findMovie = await Movie.findOne({ title }).exec();
  mongoose.disconnect();
  return findMovie;
}

async function updateMovie(title, movie) {
  const mv = await Movie.findOne({ title }).exec();
  if (mv !== null) {
    mv.genre = movie.genre;
    mv.title = movie.title;
    mv.director = movie.director;
    mv.rating = movie.rating;
    await mv.save();
  } else {
    console.log("The movie doesn't exist");
  }
  mongoose.disconnect();
}

async function deleteMovie(title) {
  await Movie.deleteOne({ title });
  mongoose.disconnect();
}

const command = process.argv[2];

switch (command) {
  case "add": {
    const title = process.argv[3];
    const genre = process.argv[4];
    const director = process.argv[5];
    const rating = process.argv[6];
    createMovie(title, genre, director, rating);
    break;
  }
  case "find": {
    const title = process.argv[3];
    findMovie(title).then((movie) => {
      console.log(movie);
    });
    break;
  }
  case "update": {
    const title = process.argv[3];

    const movie = {
      title: process.argv[4],
      genre: process.argv[5],
      director: process.argv[6],
      rating: process.argv[7],
    };

    updateMovie(title, movie);
    break;
  }
  case "delete": {
    const title = process.argv[3];
    deleteMovie(title);
    break;
  }
}
