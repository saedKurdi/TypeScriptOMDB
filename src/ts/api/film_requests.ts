import { Movie } from "./../types/movie";
// Importing 'axios' to work with 'ajax' easily :
import axios from "axios";

// Local array of movies bind to UI :
let filmsOnLocal: Movie[] = [];

// Creating axios object for omdb api :
const axiosOmdb = axios.create({
  baseURL: "http://www.omdbapi.com/",
  params: {
    apikey: "7b6a839d",
  },
});

// Random search filters for movies :
const movieWords = [
  "actor",
  "director",
  "cinema",
  "screenplay",
  "trailer",
  "blockbuster",
  "sequel",
  "prequel",
  "franchise",
  "genre",
  "script",
  "cast",
  "scene",
  "dialogue",
  "producer",
  "box office",
  "soundtrack",
  "editing",
  "premiere",
  "stunt",
];

// Get 20 movies by random word :
export async function getRandomMoviesByLetterAndReturn(): Promise<Movie[]> {
  const randomWord = movieWords[Math.floor(Math.random() * movieWords.length)];
  let movies = await axiosOmdb.get("?s=" + randomWord);

  let movieList = movies.data.Search;

  for (let i = 0; i < 10; i++) {
    const newMovie: Movie = {
      id: movieList[i].imdbID,
      title: movieList[i].Title,
      year: movieList[i].Year,
      url: movieList[i].Poster,
      type: movieList[i].Type,
      genre: "",
      description: "",
    };

    const movie_i = await axiosOmdb.get("?i=" + newMovie.id);

    newMovie.genre = movie_i.data.Genre;
    newMovie.description = movie_i.data.Plot;
    if (!doesIdExistInGlobalArray(newMovie.id)) {
      filmsOnLocal.push(newMovie);
    }
  }

  movies = await axiosOmdb.get("?s=" + randomWord + "&page=2");
  movieList = movies.data.Search;
  for (let i = 0; i < 10; i++) {
    const newMovie: Movie = {
      id: movieList[i].imdbID,
      title: movieList[i].Title,
      year: movieList[i].Year,
      url: movieList[i].Poster,
      type: movieList[i].Type,
      genre: "",
      description: "",
    };

    const movie_i = await axiosOmdb.get("?i=" + newMovie.id);

    newMovie.genre = movie_i.data.Genre;
    newMovie.description = movie_i.data.Plot;
    if (!doesIdExistInGlobalArray(newMovie.id)) {
      filmsOnLocal.push(newMovie);
    }
  }
  console.log(filmsOnLocal);
  return filmsOnLocal;
}

// Does same id exsists in global array :
export function doesIdExistInGlobalArray(id: string): boolean {
  filmsOnLocal.forEach((f: Movie) => {
    if (f.id === id) return true;
  });
  return false;
}
