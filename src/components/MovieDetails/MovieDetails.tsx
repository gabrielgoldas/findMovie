import React, { useEffect, useState } from "react";
import styles from "./MovieDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrlApi, tokenAuthorization } from "../../utils/helpers/url";
import { Movie } from "../../utils/types/Movie";
import { findPoster } from "../../utils/helpers/findPoster";
import Loading from "../Loading/Loading";
import { formatDateBR, formatRuntime } from "../../utils/helpers/formatter";

const MovieDetails = () => {
  const { id } = useParams();

  const [isLoading, setIsloading] = useState<boolean>(true);
  const [movie, setMovie] = useState<Movie>({} as Movie);

  const findMovieById = async () => {
    if (!id) return;
    try {
      const res = await axios.get(`${baseUrlApi()}/${id}`, {
        headers: {
          Authorization: `Bearer ${tokenAuthorization()}`,
        },
      });
      console.log(res.data);
      setMovie(res.data);
      setIsloading(false);
    } catch (error) {}
  };

  useEffect(() => {
    findMovieById();
  }, [id]);

  const handleFavorite = () => {
    const raw = localStorage.getItem("favorites");
    const favorites: string[] = raw ? JSON.parse(raw) : [];

    if (id && !favorites.includes(id)) {
      favorites.push(id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.detailsContainer}>
          <img
            className={styles.poster}
            src={findPoster(movie.poster_path)}
            alt={movie.original_title}
          />
          <div className={styles.content}>
            <div className={styles.divTitle}>
              <h1>{movie.title}</h1>
              <h3>{movie.tagline}</h3>
            </div>
            <div className={styles.overview}>
              <h3>Overview</h3>
              <div className={styles.infos}>
                <p>{movie.genres?.map((genre) => genre.name).join(", ")}</p>
                <p>{formatDateBR(movie.release_date)}</p>
                <p>{formatRuntime(movie.runtime)}</p>
                <p>{movie.vote_average}</p>
              </div>
              <p>{movie.overview}</p>
            </div>
            <div className={styles.companies}>
              {movie.production_companies?.map((comp) => {
                return comp.logo_path ? (
                  <img
                    key={comp.id}
                    src={findPoster(comp.logo_path)}
                    alt={comp.name}
                  />
                ) : null;
              })}
            </div>

            <button onClick={handleFavorite} className={styles.btnFavorite}>
              Favoritar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
