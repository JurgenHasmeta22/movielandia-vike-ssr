import { getAllMovies } from "../../actions/movies.telefunc";

const data = async () => {
  const movies = await getAllMovies();
  return movies;
};

export { data };
