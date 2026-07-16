import type { TmdbPaginatedResponseModel } from "../models/tmdb-paginated-response.model.ts";
import type { TmdbMediaDetailByType } from "../types/tmdb-media-detail-by.type.ts";
import type { TmdbMediaType } from "../types/tmdb-media.type.ts";
import type { TmdbMediaByType } from "../types/tmdb-media-by.type.ts";

const TMDB_API_BASE_URL = import.meta.env.VITE_TMDB_API_BASE_URL;
const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const TMDB_LANGUAGE = import.meta.env.VITE_TMDB_LANGUAGE || "it-IT";

function assertTmdbConfig() {
  if (!TMDB_API_BASE_URL) {
    throw new Error("Missing VITE_TMDB_API_BASE_URL environment variable.");
  }

  if (!TMDB_ACCESS_TOKEN) {
    throw new Error("Missing VITE_TMDB_ACCESS_TOKEN environment variable.");
  }
}

async function fetchFromTmdb<TResponse>(path: string): Promise<TResponse> {
  assertTmdbConfig();

  const url = new URL(`${TMDB_API_BASE_URL}${path}`);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed with status ${response.status}.`);
  }

  return response.json() as Promise<TResponse>;
}

export function getPopularMedia<TMediaType extends TmdbMediaType>(
  mediaType: TMediaType,
) {
  const searchParams = new URLSearchParams({
    page: "1",
  });

  searchParams.set("language", TMDB_LANGUAGE);

  return fetchFromTmdb<TmdbPaginatedResponseModel<TmdbMediaByType[TMediaType]>>(
    `/${mediaType}/popular?${searchParams.toString()}`,
  );
}

export function discoverMedia<TMediaType extends TmdbMediaType>(
  mediaType: TMediaType,
  page: number,
) {
  const searchParams = new URLSearchParams({
    page: String(Math.max(1, Math.trunc(page))),
  });

  searchParams.set("language", TMDB_LANGUAGE);

  return fetchFromTmdb<TmdbPaginatedResponseModel<TmdbMediaByType[TMediaType]>>(
    `/discover/${mediaType}?${searchParams.toString()}`,
  );
}

export function getMediaDetail<TMediaType extends TmdbMediaType>(
  mediaType: TMediaType,
  mediaId: number,
) {
  const searchParams = new URLSearchParams({
    append_to_response:
      mediaType === "movie"
        ? "release_dates,credits,recommendations,videos"
        : "content_ratings,aggregate_credits,recommendations,videos",
  });

  searchParams.set("language", TMDB_LANGUAGE);

  return fetchFromTmdb<TmdbMediaDetailByType[TMediaType]>(
    `/${mediaType}/${mediaId}?${searchParams.toString()}`,
  );
}
