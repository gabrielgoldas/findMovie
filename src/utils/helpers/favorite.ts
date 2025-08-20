import { Favorite } from "../types/Favorite";

export const favoriteExists = (id: number) => {
  const raw = localStorage.getItem("favorites");
  const favorites: Favorite[] = raw ? JSON.parse(raw) : [];
  return favorites.some((fav) => fav.id === id);
};

export const getFavorites = () => {
  const raw = localStorage.getItem("favorites");
  const favorites: Favorite[] = raw ? JSON.parse(raw) : [];
  return favorites;
};
