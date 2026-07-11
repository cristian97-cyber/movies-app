import type { MediaModel } from "../../../models/media.model.ts";
import type { PaginatedMediaModel } from "../../../models/paginated-media.model.ts";
import type { TmdbMovieModel } from "../models/tmdb-movie.model.ts";
import type { TmdbPaginatedResponseModel } from "../models/tmdb-paginated-response.model.ts";
import type { TmdbTvModel } from "../models/tmdb-tv.model.ts";
import type { TmdbMediaByType } from "../types/tmdb-media-by.type.ts";
import type { TmdbMediaType } from "../types/tmdb-media.type.ts";

type PaginatedMappingOptions = {
  maxPages?: number;
  maxResults?: number;
};

export function mapTmdbPaginatedMedia<TMediaType extends TmdbMediaType>(
  mediaType: TMediaType,
  response: TmdbPaginatedResponseModel<TmdbMediaByType[TMediaType]>,
  options: PaginatedMappingOptions = {},
): PaginatedMediaModel {
  return {
    page: response.page,
    results: response.results.map((media) => mapTmdbMedia(mediaType, media)),
    totalPages: Math.min(
      response.total_pages,
      options.maxPages ?? response.total_pages,
    ),
    totalResults: Math.min(
      response.total_results,
      options.maxResults ?? response.total_results,
    ),
  };
}

function mapTmdbMedia<TMediaType extends TmdbMediaType>(
  mediaType: TMediaType,
  media: TmdbMediaByType[TMediaType],
): MediaModel {
  let title: string;
  let originalTitle: string;
  let releaseDate: string;

  if (isTmdbMovie(media)) {
    title = media.title;
    originalTitle = media.original_title;
    releaseDate = media.release_date;
  } else {
    title = media.name;
    originalTitle = media.original_name;
    releaseDate = media.first_air_date;
  }

  return {
    id: media.id,
    mediaType,
    title,
    originalTitle,
    overview: media.overview,
    originalLanguage: media.original_language,
    posterPath: media.poster_path,
    backdropPath: media.backdrop_path,
    releaseDate,
    releaseYear: releaseDate?.slice(0, 4) || "TBA",
    genreIds: media.genre_ids,
    popularity: media.popularity,
    rating: media.vote_average,
    voteCount: media.vote_count,
  };
}

function isTmdbMovie(
  media: TmdbMovieModel | TmdbTvModel,
): media is TmdbMovieModel {
  return "title" in media;
}
