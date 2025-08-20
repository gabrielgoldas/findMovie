export interface Movie {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  tagline: string;
  runtime: number;
  genres: Genre[];
  production_companies: ProductionCompanies[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

type Genre = {
  id: number;
  name: string;
};

export type ProductionCompanies = {
  id: number;
  logo_path: string;
  logo: string;
  name: string;
  origin_country: string;
};

export interface MovieApiResponse {
  results: Movie[];
  total_pages: number;
}
