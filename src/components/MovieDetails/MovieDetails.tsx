import React, { useEffect, useState } from "react";
import styles from "./MovieDetails.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrlApi, tokenAuthorization } from "../../utils/helpers/url";
import { Movie, ProductionCompanies } from "../../utils/types/Movie";
import { findPoster } from "../../utils/helpers/findPoster";
import Loading from "../Loading/Loading";
import { formatDateBR, formatRuntime } from "../../utils/helpers/formatter";
import { Favorite } from "../../utils/types/Favorite";

const MovieDetails = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [movie, setMovie] = useState<Movie>({} as Movie);
  const [companies, setCompanies] = useState<ProductionCompanies[]>();
  const navigate = useNavigate();

  const findMovieById = async () => {
    if (!id) return;
    try {
      const res = await axios.get(`${baseUrlApi()}/${id}`, {
        headers: {
          Authorization: `Bearer ${tokenAuthorization()}`,
        },
      });
      setMovie(res.data);
      setIsLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    findMovieById();
  }, [id]);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const paths = await Promise.all(
          movie.production_companies.map(async (comp) => {
            const path = findPoster(comp.logo_path);
            return { ...comp, logo: path };
          })
        );
        setCompanies(paths);
        console.log(paths);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    if (movie.production_companies) {
      loadCompanies();
    }
  }, [movie.production_companies]);

  const handleFavorite = () => {
    const raw = localStorage.getItem("favorites");
    const favorites: Favorite[] = raw ? JSON.parse(raw) : [];
    const favoriteAlreadyExists = favorites.some((fav) => fav.id === movie.id);

    if (movie.id && !favoriteAlreadyExists) {
      const favorite: Favorite = {
        id: movie.id,
        poster_path: movie.poster_path,
        original_title: movie.original_title,
        title: movie.title,
      };
      favorites.push(favorite);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("Filme favoritado com sucesso!");
    } else {
      alert("Esse filme já é um favorito");
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
          <button
            className={`${styles.backBtn} btnDefault`}
            onClick={() => navigate(-1)}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div className={styles.content}>
            <div className={styles.divTitle}>
              <h1>{movie.title}</h1>
              <h3>{movie.tagline}</h3>
            </div>
            <div className={styles.overview}>
              <p className={styles.overviewText}>{movie.overview}</p>
              <div className={styles.infos}>
                <p>{movie.genres?.map((genre) => genre.name).join(", ")}</p>
                <p>{formatDateBR(movie.release_date)}</p>
                <p>{formatRuntime(movie.runtime)}</p>
                <p>{movie.vote_average}</p>
              </div>
            </div>
            <div
              className={
                !isLoading ? styles.companies : styles.companiesLoading
              }
            >
              {isLoading ? (
                <Loading />
              ) : (
                companies?.map((comp) => (
                  <img
                    key={comp.id}
                    src={comp.logo}
                    alt={comp.name}
                    className={styles.companieImg}
                  />
                ))
              )}
            </div>

            <button
              onClick={handleFavorite}
              className={`${styles.btnFavorite} btnDefault`}
            >
              Favoritar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
