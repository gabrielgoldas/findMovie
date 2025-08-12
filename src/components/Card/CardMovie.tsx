import React from "react";
import { Movie } from "../../utils/types/Film";
import style from "./CardMovie.module.css";

interface CardFilmProps {
  movies: Movie[];
}

const CardFilm = (props: CardFilmProps) => {
  const { movies } = props;

  const findPoster = (poster_path: string) => {
    return `https://image.tmdb.org/t/p/w500${poster_path}`;
  };

  return (
    <div className={style.container}>
      {movies &&
        movies.map((movie) => (
          <div className={style.item}>
            <img
              src={findPoster(movie.poster_path)}
              alt={movie.original_title}
            />
            <h3>{movie.title}</h3>
            <button>Ver Detalhes</button>
          </div>
        ))}
    </div>
  );
};

export default CardFilm;
