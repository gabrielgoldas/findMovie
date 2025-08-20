import React from "react";
import { Movie } from "../../utils/types/Movie";
import style from "./CardMovie.module.css";
import NoPoster from "../NoPoster/NoPoster";
import { useNavigate } from "react-router-dom";
import { findPoster } from "../../utils/helpers/findPoster";
import { Favorite } from "../../utils/types/Favorite";

interface CardMovieProps {
  movies: Movie[] | Favorite[];
}

const CardMovie = (props: CardMovieProps) => {
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
          <button
            className="btnDefault"
            onClick={() => navigate(`/filme/${movie.id}`)}
          >
            Ver Detalhes
          </button>
        </div>
      ))}
    </div>
  );
};

export default CardMovie;
