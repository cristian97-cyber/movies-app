import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { discoverMedia } from "../client/tmdbClient.ts";
import type { TmdbMediaType } from "../types/tmdb-media.type.ts";

export function useDiscoverMedia(mediaType: TmdbMediaType, page: number) {
  const normalizedPage = Math.max(1, Math.trunc(page));

  return useQuery({
    queryKey: ["tmdb", "discover", mediaType, normalizedPage] as const,
    queryFn: () => discoverMedia(mediaType, normalizedPage),
    placeholderData: keepPreviousData,
  });
}
