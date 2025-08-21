import React from "react";
import { Movie } from "../../utils/types/Movie";
import styles from "./CardMovie.module.css";
import NoPoster from "../NoPoster/NoPoster";
import { useNavigate } from "react-router-dom";
import { findPoster } from "../../utils/helpers/findPoster";
import { Favorite } from "../../utils/types/Favorite";

interface CardMovieProps {
  movies: Movie[] | Favorite[];
  isFavorite: boolean;
}

const CardMovie = (props: CardMovieProps) => {
  const { movies, isFavorite } = props;

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {isFavorite ? (
        <button
          className={`${styles.backBtn} btnDefault`}
          onClick={() => navigate(-1)}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      ) : (
        ""
      )}
      {movies.map((movie, index) => (
        <div className={styles.item} key={index}>
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
