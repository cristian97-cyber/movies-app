import type { TmdbMediaDetailModel } from "./tmdb-media-detail.model.ts";

export interface TmdbTvDetailModel extends TmdbMediaDetailModel {
  name: string;
  original_name: string;
  first_air_date: string;
  episode_run_time: number[];
  number_of_episodes: number;
  number_of_seasons: number;
  content_ratings: {
    results: TmdbTvContentRatingModel[];
  };
}

export interface TmdbTvContentRatingModel {
  descriptors: string[];
  iso_3166_1: string;
  rating: string;
}
