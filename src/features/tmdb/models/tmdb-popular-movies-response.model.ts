import type { TmdbMovieModel } from "./tmdb-movie.model.ts";

export interface TmdbPopularMoviesResponseModel {
  page: number;
  results: TmdbMovieModel[];
  total_pages: number;
  total_results: number;
}
