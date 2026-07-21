import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { discoverMedia } from "../client/tmdbClient.ts";
import { mapTmdbPaginatedMedia } from "../mappers/tmdb-media.mapper.ts";
import type { TmdbMediaType } from "../types/tmdb-media.type.ts";
import type { TmdbSortByType } from "../types/tmdb-sort-by.type.ts";

const TMDB_MAX_DISCOVER_PAGES = 500;
const TMDB_RESULTS_PER_PAGE = 20;

export function useDiscoverMedia(
  mediaType: TmdbMediaType,
  page: number,
  genre: string,
  sortBy: TmdbSortByType,
) {
  const normalizedPage = Math.max(1, Math.trunc(page));

  return useQuery({
    queryKey: [
      "tmdb",
      "discover",
      mediaType,
      normalizedPage,
      genre,
      sortBy,
    ] as const,
    queryFn: () => discoverMedia(mediaType, normalizedPage, genre, sortBy),
    placeholderData: keepPreviousData,
    select: (response) =>
      mapTmdbPaginatedMedia(mediaType, response, {
        maxPages: TMDB_MAX_DISCOVER_PAGES,
        maxResults: TMDB_MAX_DISCOVER_PAGES * TMDB_RESULTS_PER_PAGE,
      }),
  });
}
