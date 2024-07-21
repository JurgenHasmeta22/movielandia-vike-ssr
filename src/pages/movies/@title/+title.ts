import type { PageContext } from "vike/types";
import { Data } from "./+data";

export default function title(pageContext: PageContext<Data>) {
    const movie = pageContext.data;
    return movie?.title;
}
