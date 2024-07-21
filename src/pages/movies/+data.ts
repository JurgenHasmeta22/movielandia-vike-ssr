import { getMovies } from "~/actions/movie.telefunc";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async () => {
    const response = await getMovies({});
    return response.movies;
};
