import type { TmdbMediaModel } from "./tmdb-media.model.ts";

export interface TmdbMovieModel extends TmdbMediaModel {
  title: string;
  original_title: string;
  media_type: "movie";
  adult: boolean;
  release_date: string;
  video: boolean;
}
