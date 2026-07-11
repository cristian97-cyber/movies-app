import type { TmdbMediaModel } from "./tmdb-media.model.ts";

export interface TmdbTvModel extends TmdbMediaModel {
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
}
