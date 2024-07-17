import React from "react";
import { useData } from "vike-react/useData";
import "./style.css";

export default function Page() {
  const movies = useData<any>();

  return (
    <div className="movie-grid">
      {movies.map((movie: any) => (
        <div key={movie.id} className="movie-card">
          <img
            src={movie.photoSrc}
            alt={movie.title}
            className="movie-poster"
          />
          <div className="movie-info">
            <h2 className="movie-title">{movie.title}</h2>
            <div className="movie-metadata">
              <span className="movie-year">{movie.releaseYear}</span>
              <span className="movie-duration">{movie.duration}</span>
              <span className="movie-rating">
                IMDb: {movie.ratingImdb.toFixed(1)}
              </span>
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
