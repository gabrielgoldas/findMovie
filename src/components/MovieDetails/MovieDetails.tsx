import React, { useEffect, useState } from "react";
import styles from "./MovieDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrlApi, tokenAuthorization } from "../../utils/helpers/url";
import { Movie } from "../../utils/types/Movie";
import { findPoster } from "../../utils/helpers/findPoster";
import Loading from "../Loading/Loading";

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

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.detailsContainer}>
          <img src={findPoster(movie.poster_path)} alt={movie.original_title} />
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <p>Nota: {movie.vote_average}</p>
          <p>Popularidade: {movie.popularity}</p>
          <p>Gêneros: {movie.genres?.map((genre) => genre.name).join(", ")}</p>
          {movie.production_companies?.map((comp) => {
            return comp.logo_path ? (
              <img
                key={comp.id}
                src={findPoster(comp.logo_path)}
                alt={comp.name}
              />
            ) : null;
          })}

          <button>Favoritar</button>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
