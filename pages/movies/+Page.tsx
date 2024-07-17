import { Movie } from "@prisma/client";
import React from "react";
import { useData } from "vike-react/useData";
import { navigate } from "vike/client/router";
import { Data } from "./+data";

export default function Page() {
    const movies = useData<Data>();

    return (
        <div className="movie-grid">
            {movies.map((movie: Movie, index: number) => (
                <div
                    key={index}
                    className="movie-card"
                    onClick={() => {
                        navigate(`movies/${movie.title}`);
                    }}
                >
                    <img src={movie.photoSrc} alt={movie.title} className="movie-poster" loading="lazy" />
                    <div className="movie-info">
                        <h2 className="movie-title">{movie.title}</h2>
                        <div className="movie-metadata">
                            <span className="movie-year">{movie.releaseYear}</span>
                            <span className="movie-duration">{movie.duration}</span>
                            <span className="movie-rating">IMDb: {movie.ratingImdb.toFixed(1)}</span>
                        </div>
                        <p className="movie-description">{movie.description}</p>
                        <a
                            href={movie.trailerSrc}
                            className="movie-trailer-btn"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Watch Trailer
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}
