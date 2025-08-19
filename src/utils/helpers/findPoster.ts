export const findPoster = (poster_path: string) => {
  if (poster_path === null) {
    return "/logo.png";
  }
  return `https://image.tmdb.org/t/p/w500${poster_path}`;
};
