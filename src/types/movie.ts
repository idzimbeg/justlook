export interface MovieCollection {
  page?: number;
  results: Movie[];
  total_pages?: number;
  total_results?: number;
}

export interface Movie {
  id: number;
  poster_path: string;
  backdrop_path?: string;
  title: string;
  vote_average: number;
  overview?: string;
  release_date?: string;
  genres: Genre[];
  revenue?: string;
  tagline?: string;
}
export interface MovieItem {
  id: number;
  title: string;
}
export interface Genre {
  id: number;
  name: string;
}
