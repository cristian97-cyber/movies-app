import type { TmdbPopularMoviesResponseModel } from "../models/tmdb-popular-movies-response.model.ts";

const TMDB_API_BASE_URL = import.meta.env.VITE_TMDB_API_BASE_URL;
const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const TMDB_LANGUAGE = import.meta.env.VITE_TMDB_LANGUAGE;

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

export function getPopularMovies() {
  const searchParams = new URLSearchParams({
    page: "1",
  });

  if (TMDB_LANGUAGE) {
    searchParams.set("language", TMDB_LANGUAGE);
  }

  return fetchFromTmdb<TmdbPopularMoviesResponseModel>(
    `/movie/popular?${searchParams.toString()}`,
  );
}
