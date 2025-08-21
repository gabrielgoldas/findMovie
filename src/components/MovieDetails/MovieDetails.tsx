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
import Alert from "../Alert/Alert";
import { favoriteExists, getFavorites } from "../../utils/helpers/favorite";

const MovieDetails = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [movie, setMovie] = useState<Movie>({} as Movie);
  const [companies, setCompanies] = useState<ProductionCompanies[]>();
  const [isFavorite, setIsFavorite] = useState<boolean>(true);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const navigate = useNavigate();

  const findMovieById = async () => {
    if (!id) return;
    try {
      const res = await axios.get(`${baseUrlApi()}/movie/${id}`, {
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
    const favorites = getFavorites();
    const favoriteAlreadyExists = favoriteExists(movie.id);

    if (movie.id && !favoriteAlreadyExists) {
      const favorite: Favorite = {
        id: movie.id,
        poster_path: movie.poster_path,
        original_title: movie.original_title,
        title: movie.title,
      };
      favorites.push(favorite);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setAlertMessage("Filme favoritado com sucesso!");
      setShowAlert(true);
      setIsFavorite(true);
      console.log(favorites);
    }
  };

  const handleRemoveFavorite = () => {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(false);
    console.log(updatedFavorites);
    setAlertMessage("Filme removido dos Favoritos");
    setShowAlert(true);
  };

  const handlefavoriteMessage = () => {
    if (isFavorite) {
      return `Remover Favorito`;
    } else {
      return `Favoritar`;
    }
  };

  useEffect(() => {
    if (movie.id) {
      const favoriteAlreadyExists = favoriteExists(movie.id);
      setIsFavorite(favoriteAlreadyExists);
    }
  }, [movie.id]);

  return (
    <>
      {showAlert && (
        <Alert message={alertMessage} onClose={() => setShowAlert(false)} />
      )}
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
            <div className={styles.titleContainer}>
              <h1>{movie.title}</h1>
              <h3>{movie.tagline}</h3>
            </div>
            <div className={styles.overviewContainer}>
              <p className={styles.overviewText}>{movie.overview}</p>
              <div className={styles.infos}>
                <p className={styles.genres}>
                  {movie.genres?.map((genre) => genre.name).join(", ")}
                </p>
                <p>{formatDateBR(movie.release_date)}</p>
                <p>{formatRuntime(movie.runtime)}</p>
                <p>
                  <i
                    className="fa-solid fa-star"
                    style={{ color: "#eb5e28" }}
                  ></i>
                  {movie.vote_average.toFixed(1)}
                </p>
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
              onClick={isFavorite ? handleRemoveFavorite : handleFavorite}
              className={`${styles.btnFavorite} btnDefault`}
            >
              {handlefavoriteMessage()}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
