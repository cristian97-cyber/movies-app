import { useQuery } from "@tanstack/react-query";

import { getPopularMedia } from "../client/tmdbClient.ts";
import { mapTmdbPaginatedMedia } from "../mappers/tmdb-media.mapper.ts";
import type { TmdbMediaType } from "../types/tmdb-media.type.ts";

export function usePopularMedia(mediaType: TmdbMediaType) {
  return useQuery({
    queryKey: ["tmdb", mediaType, "popular"] as const,
    queryFn: () => getPopularMedia(mediaType),
    select: (response) => mapTmdbPaginatedMedia(mediaType, response),
  });
}
