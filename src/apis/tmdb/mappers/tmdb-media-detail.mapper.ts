import type { MediaDetailModel } from "../../../features/media/models/media-detail.model.ts";
import type { TmdbMovieDetailModel } from "../models/tmdb-movie-detail.model.ts";
import type { TmdbTvDetailModel } from "../models/tmdb-tv-detail.model.ts";
import type { TmdbMediaDetailByType } from "../types/tmdb-media-detail-by.type.ts";
import type { TmdbMediaType } from "../types/tmdb-media.type.ts";
import { mapTmdbPaginatedMedia } from "./tmdb-media.mapper.ts";
import type { TmdbVideoModel } from "../models/tmdb-video.model.ts";
import type {
  TmdbWatchProviderModel,
  TmdbWatchProvidersResponseModel,
} from "../models/tmdb-watch-provider.model.ts";
import type { WatchProviderModel } from "../../../features/media/models/watch-provider.model.ts";

const getBrowserRegion = (): string => {
  const locale = navigator.language;

  try {
    return new Intl.Locale(locale).region ?? "IT";
  } catch {
    return "IT";
  }
};

const WATCH_PROVIDER_CATEGORIES = ["flatrate", "free", "ads"] as const;

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
  let cast: MediaDetailModel["cast"];
  let recommendations: MediaDetailModel["recommendations"];

  if (mediaType === "movie") {
    const movieDetail = media as TmdbMovieDetailModel;

    title = movieDetail.title;
    originalTitle = movieDetail.original_title;
    releaseDate = movieDetail.release_date;
    durationMinutes = movieDetail.runtime;
    cast = movieDetail.credits.cast.map((castMember) => ({
      id: castMember.id,
      name: castMember.name,
      character: castMember.character,
      profilePath: castMember.profile_path,
    }));
    recommendations = mapTmdbPaginatedMedia(
      "movie",
      movieDetail.recommendations,
    );
  } else {
    const tvDetail = media as TmdbTvDetailModel;

    title = tvDetail.name;
    originalTitle = tvDetail.original_name;
    releaseDate = tvDetail.first_air_date;
    durationMinutes = tvDetail.episode_run_time.at(0) ?? null;
    numberOfSeasons = tvDetail.number_of_seasons;
    numberOfEpisodes = tvDetail.number_of_episodes;
    cast = tvDetail.aggregate_credits.cast.map((castMember) => ({
      id: castMember.id,
      name: castMember.name,
      character: castMember.roles.at(0)?.character ?? "",
      profilePath: castMember.profile_path,
    }));
    recommendations = mapTmdbPaginatedMedia("tv", tvDetail.recommendations);
  }

  const trailerKey = getTrailerKey(media.videos.results);
  const watchProviders = getWatchProviders(media["watch/providers"]);

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
    releaseYear: releaseDate?.slice(0, 4) || "N/D",
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
    cast,
    recommendations,
    trailer: trailerKey ? `https://www.youtube.com/embed/${trailerKey}` : null,
    watchProviders,
  };
}

function getTrailerKey(videos: TmdbVideoModel[]): string | null {
  let trailers: TmdbVideoModel[] = [];
  const types = ["Trailer", "Teaser"];
  let isOfficial = true;
  let i = 0;

  while (trailers.length === 0 && i < types.length) {
    trailers = videos.filter(
      (v) =>
        v.site === "YouTube" &&
        v.type === types[i] &&
        v.official === isOfficial,
    );

    if (trailers.length === 0) {
      if (isOfficial) isOfficial = false;
      else {
        isOfficial = true;
        i++;
      }
    }
  }

  return (
    trailers.sort(
      (a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime(),
    )[0]?.key ?? null
  );
}

function getWatchProviders(
  providersResponse?: TmdbWatchProvidersResponseModel,
): WatchProviderModel[] {
  if (!providersResponse) {
    return [];
  }

  const tmdbProvidersByCountry = providersResponse.results[getBrowserRegion()];
  return tmdbProvidersByCountry
    ? Array.from(
        new Map(
          WATCH_PROVIDER_CATEGORIES.flatMap(
            (category) => tmdbProvidersByCountry[category] ?? [],
          ).map((provider) => [provider.provider_id, provider]),
        ).values(),
      )
        .map(mapTmdbWatchProvider)
        .sort((a, b) => a.priority - b.priority)
    : [];
}

function mapTmdbWatchProvider(
  tmdbProvider: TmdbWatchProviderModel,
): WatchProviderModel {
  return {
    id: tmdbProvider.provider_id,
    name: tmdbProvider.provider_name,
    logoPath: tmdbProvider.logo_path,
    priority: tmdbProvider.display_priority,
  };
}
