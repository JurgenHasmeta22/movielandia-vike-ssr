import type { PageContext } from "vike/types";

export default function title(pageContext: PageContext<any>) {
    const movie = pageContext.data;
    return movie.title;
}
