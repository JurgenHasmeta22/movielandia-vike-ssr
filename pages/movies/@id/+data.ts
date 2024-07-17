import { PageContextServer } from "vike/types";
import { getMovieByTitle } from "../../../actions/movies.telefunc";
import { Movie } from "@prisma/client";
export type Data = Awaited<ReturnType<typeof data>>;

const data = async (pageContext: PageContextServer) => {
    // @ts-ignore
    const movie: Movie = await getMovieByTitle(pageContext.routeParams.id);
    return movie;
};

export { data };
