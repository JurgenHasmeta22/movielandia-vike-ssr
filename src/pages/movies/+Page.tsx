import { Movie } from "@prisma/client";
import { useData } from "vike-react/useData";
import { Data } from "./+data";
import CardItem from "~/components/root/ui/cardItem/CardItem";

export default function Page() {
    const movies = useData<Data>();

    return (
        <div className="movie-grid">
            {movies.map((movie: Movie, index: number) => (
                <CardItem data={movie} key={index} type="movie" />
            ))}
        </div>
    );
}
