import { PageContextServer } from "vike/types";
import { getLatestMovies, getMovies } from "~/actions/movie.telefunc";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (pageContext: PageContextServer) => {
    const sortBy = pageContext.urlParsed.search.moviesSortBy;
    const ascOrDesc = pageContext.urlParsed.search.moviesAscOrDesc;
    const page = pageContext.urlParsed.search.page;
    const queryParams: Record<string, string | number> = { page };

    if (sortBy) {
        queryParams.sortBy = sortBy;
    }

    if (ascOrDesc) {
        queryParams.ascOrDesc = ascOrDesc;
    }

    if (page) {
        queryParams.page = page;
    } else {
        queryParams.page = 1;
    }

    const responseMovies = await getMovies(queryParams);
    const responseLatestMovies = await getLatestMovies();

    console.log(responseMovies, responseLatestMovies);
    return { moviesData: responseMovies, latestMovies: responseLatestMovies };
};
