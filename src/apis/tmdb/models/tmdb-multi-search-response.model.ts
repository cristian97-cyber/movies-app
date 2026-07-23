import type { TmdbMovieModel } from "./tmdb-movie.model.ts";
import type { TmdbPaginatedResponseModel } from "./tmdb-paginated-response.model.ts";
import type { TmdbTvModel } from "./tmdb-tv.model.ts";

type TmdbMultiSearchMovieModel = TmdbMovieModel & {
  media_type: "movie";
};

type TmdbMultiSearchTvModel = TmdbTvModel & {
  media_type: "tv";
};

interface TmdbMultiSearchPersonModel {
  id: number;
  media_type: "person";
}

export type TmdbMultiSearchResultModel =
  | TmdbMultiSearchMovieModel
  | TmdbMultiSearchTvModel
  | TmdbMultiSearchPersonModel;

export type TmdbMultiSearchResponse =
  TmdbPaginatedResponseModel<TmdbMultiSearchResultModel>;
