import React from "react";
import { Movie } from "../../utils/types/Movie";
import style from "./CardMovie.module.css";
import NoPoster from "../NoPoster/NoPoster";
import { useNavigate } from "react-router-dom";
import { findPoster } from "../../utils/helpers/findPoster";

interface CardFilmProps {
  movies: Movie[];
}

const CardFilm = (props: CardFilmProps) => {
  const { movies } = props;

  const navigate = useNavigate();

  return (
    <div className={style.container}>
      {movies.map((movie, index) => (
        <div className={style.item} key={index}>
          {movie.poster_path === null ? (
            <NoPoster title={movie.title} />
          ) : (
            <img
              src={findPoster(movie.poster_path)}
              alt={movie.original_title}
            />
          )}
          <button onClick={() => navigate(`/filme/${movie.id}`)}>
            Ver Detalhes
          </button>
        </div>
      ))}
    </div>
  );
};

export default CardFilm;
