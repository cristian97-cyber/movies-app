import type { TmdbGenreModel } from "./tmdb-genre.model.ts";
import type { TmdbProductionCompanyModel } from "./tmdb-production-company.model.ts";
import type { TmdbVideoModel } from "./tmdb-video.model.ts";
import type { TmdbWatchProvidersResponseModel } from "./tmdb-watch-provider.model.ts";

export interface TmdbMediaDetailModel {
  id: number;
  backdrop_path: string | null;
  genres: TmdbGenreModel[];
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: TmdbProductionCompanyModel[];
  status: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  videos: {
    results: TmdbVideoModel[];
  };
  "watch/providers"?: TmdbWatchProvidersResponseModel;
}
