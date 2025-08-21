import React, { useEffect, useState } from "react";
import styles from "./FavoriteMovie.module.css";
import Header from "../Header/Header";
import CardMovie from "../Card/CardMovie";
import { Favorite } from "../../utils/types/Favorite";

const FavoriteMovie = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const handleGetFavoriteMovies = () => {
    const raw = localStorage.getItem("favorites");
    const favorites: Favorite[] = raw ? JSON.parse(raw) : [];

    setFavorites(favorites);

    return console.log(favorites);
  };

  useEffect(() => {
    handleGetFavoriteMovies();
  }, []);

  return (
    <>
      <Header title="Favoritos" isFavorite={true} />
      <CardMovie movies={favorites} isFavorite={true} />
    </>
  );
};

export default FavoriteMovie;
