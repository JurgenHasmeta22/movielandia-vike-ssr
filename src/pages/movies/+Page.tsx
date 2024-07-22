import { Movie } from "@prisma/client";
import { useData } from "vike-react/useData";
import { Data } from "./+data";

export default function Page() {
    const movies = useData<Data>();

    return (
        <div className="movie-grid">
            {movies.map((movie: Movie, index: number) => (
                <span key={index}>{movie.title}</span>
            ))}
        </div>
    );
}
