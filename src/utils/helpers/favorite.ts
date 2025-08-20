import { Favorite } from "../types/Favorite";

export const favoriteExists = (id: number) => {
  const raw = localStorage.getItem("favorites");
  const favorites: Favorite[] = raw ? JSON.parse(raw) : [];
  const favoriteAlreadyExists = favorites.some((fav) => fav.id === id);
  return favoriteAlreadyExists ? true : false;
};

export const getFavorites = () => {
  const raw = localStorage.getItem("favorites");
  const favorites: Favorite[] = raw ? JSON.parse(raw) : [];
  return favorites;
};
