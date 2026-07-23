import type { TmdbMovieDetailModel } from "../models/tmdb-movie-detail.model.ts";
import type { TmdbTvDetailModel } from "../models/tmdb-tv-detail.model.ts";

export type TmdbMediaDetailByType = {
  movie: TmdbMovieDetailModel;
  tv: TmdbTvDetailModel;
};
