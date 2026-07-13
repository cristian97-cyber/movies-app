import type { MediaDetailModel } from "../../../models/media-detail.model.ts";
import type { TmdbMovieDetailModel } from "../models/tmdb-movie-detail.model.ts";
import type { TmdbTvDetailModel } from "../models/tmdb-tv-detail.model.ts";
import type { TmdbMediaDetailByType } from "../types/tmdb-media-detail-by.type.ts";
import type { TmdbMediaType } from "../types/tmdb-media.type.ts";

export function mapTmdbMediaDetail<TMediaType extends TmdbMediaType>(
  mediaType: TMediaType,
  media: TmdbMediaDetailByType[TMediaType],
): MediaDetailModel {
  let title: string;
  let originalTitle: string;
  let releaseDate: string;
  let durationMinutes: number | null;
  let numberOfSeasons: number | null = null;
  let numberOfEpisodes: number | null = null;

  if (mediaType === "movie") {
    const movieDetail = media as TmdbMovieDetailModel;

    title = movieDetail.title;
    originalTitle = movieDetail.original_title;
    releaseDate = movieDetail.release_date;
    durationMinutes = movieDetail.runtime;
  } else {
    const tvDetail = media as TmdbTvDetailModel;

    title = tvDetail.name;
    originalTitle = tvDetail.original_name;
    releaseDate = tvDetail.first_air_date;
    durationMinutes = tvDetail.episode_run_time.at(0) ?? null;
    numberOfSeasons = tvDetail.number_of_seasons;
    numberOfEpisodes = tvDetail.number_of_episodes;
  }

  return {
    id: media.id,
    mediaType,
    title,
    originalTitle,
    overview: media.overview,
    tagline: media.tagline,
    originalLanguage: media.original_language,
    posterPath: media.poster_path,
    backdropPath: media.backdrop_path,
    releaseDate,
    releaseYear: releaseDate?.slice(0, 4) || "TBA",
    genres: media.genres,
    popularity: media.popularity,
    rating: media.vote_average,
    voteCount: media.vote_count,
    durationMinutes,
    status: media.status,
    numberOfSeasons,
    numberOfEpisodes,
    productionCompanies: media.production_companies.map((company) => ({
      id: company.id,
      name: company.name,
      logoPath: company.logo_path,
      originCountry: company.origin_country,
    })),
  };
}
