import type { TmdbMediaDetailModel } from "./tmdb-media-detail.model.ts";
import type { TmdbPaginatedResponseModel } from "./tmdb-paginated-response.model.ts";
import type { TmdbTvModel } from "./tmdb-tv.model.ts";
import type { TmdbTvCastMemberModel } from "./tmdb-tv-cast-member.model.ts";

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
  aggregate_credits: {
    cast: TmdbTvCastMemberModel[];
  };
  recommendations: TmdbPaginatedResponseModel<TmdbTvModel>;
}

export interface TmdbTvContentRatingModel {
  descriptors: string[];
  iso_3166_1: string;
  rating: string;
}
