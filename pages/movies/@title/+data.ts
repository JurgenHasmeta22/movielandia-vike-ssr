import { PageContextServer } from "vike/types";
import { Movie } from "@prisma/client";
import { getMovieByTitle } from "../../../actions/movies.telefunc";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (pageContext: PageContextServer) => {
    const movie: Movie | null = await getMovieByTitle(pageContext.routeParams.title);
    return movie;
};
