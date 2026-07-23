import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { searchMultiMedia } from "../client/tmdbClient.ts";
import { mapTmdbMultiSearch } from "../mappers/tmdb-search.mapper.ts";

export function useSearchMedia(query: string, page: number) {
  const normalizedPage = Math.max(1, Math.trunc(page));

  return useQuery({
    queryKey: ["tmdb", "search", query, normalizedPage] as const,
    queryFn: () => searchMultiMedia(query, normalizedPage),
    enabled: query.trim().length > 0,
    placeholderData: keepPreviousData,
    select: mapTmdbMultiSearch,
  });
}
