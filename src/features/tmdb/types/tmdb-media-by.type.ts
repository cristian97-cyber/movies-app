import type { TmdbMovieModel } from "../models/tmdb-movie.model.ts";
import type { TmdbTvModel } from "../models/tmdb-tv.model.ts";

export type TmdbMediaByType = {
  movie: TmdbMovieModel;
  tv: TmdbTvModel;
};
