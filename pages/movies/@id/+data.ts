import { PageContextServer } from "vike/types";
import { getMovieByTitle } from "../../../actions/movies.telefunc";

const data = async (pageContext: PageContextServer) => {
    const movie = await getMovieByTitle(pageContext.routeParams.id);
    return movie;
};

export { data };
