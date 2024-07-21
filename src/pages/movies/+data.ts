import { Movie } from "@prisma/client";
import { getAllMovies } from "~/actions/movies.telefunc";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async () => {
    const movies: Movie[] = await getAllMovies();
    return movies;
};
