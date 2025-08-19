import React from "react";
import { Movie } from "../../utils/types/Film";
import style from "./CardMovie.module.css";
import Loading from "../Loading/Loading";
import NoPoster from "../NoPoster/NoPoster";

interface CardFilmProps {
  movies: Movie[];
}

const CardFilm = (props: CardFilmProps) => {
  const { movies } = props;

  const findPoster = (poster_path: string) => {
    if (poster_path === null) {
      return "/logo.png";
    }
    return `https://image.tmdb.org/t/p/w500${poster_path}`;
  };

  return (
    <div className={style.container}>
      {movies.map((movie) => (
        <div className={style.item}>
          {movie.poster_path === null ? (
            <NoPoster title={movie.title} />
          ) : (
            <img
              src={findPoster(movie.poster_path)}
              alt={movie.original_title}
            />
          )}
          <button>Ver Detalhes</button>
        </div>
      ))}
    </div>
  );
};

export default CardFilm;
