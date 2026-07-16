import type { TmdbMediaDetailModel } from "./tmdb-media-detail.model.ts";
import type { TmdbMovieModel } from "./tmdb-movie.model.ts";
import type { TmdbPaginatedResponseModel } from "./tmdb-paginated-response.model.ts";
import type { TmdbMovieCastMemberModel } from "./tmdb-movie-cast-member.model.ts";

export interface TmdbMovieDetailModel extends TmdbMediaDetailModel {
  title: string;
  original_title: string;
  release_date: string;
  runtime: number | null;
  release_dates: {
    results: TmdbMovieReleaseDatesByCountryModel[];
  };
  credits: {
    cast: TmdbMovieCastMemberModel[];
  };
  recommendations: TmdbPaginatedResponseModel<TmdbMovieModel>;
}

export interface TmdbMovieReleaseDateModel {
  certification: string;
  descriptors: string[];
  iso_639_1: string;
  note: string;
  release_date: string;
  type: number;
}

export interface TmdbMovieReleaseDatesByCountryModel {
  iso_3166_1: string;
  release_dates: TmdbMovieReleaseDateModel[];
}
