import { useQuery } from "@tanstack/react-query";

import { getMediaDetail } from "../client/tmdbClient.ts";
import { mapTmdbMediaDetail } from "../mappers/tmdb-media-detail.mapper.ts";
import type { TmdbMediaType } from "../types/tmdb-media.type.ts";

export function useMediaDetail(mediaType: TmdbMediaType, mediaId: number) {
  return useQuery({
    queryKey: ["tmdb", mediaType, "detail", mediaId] as const,
    queryFn: () => getMediaDetail(mediaType, mediaId),
    enabled: mediaId > 0,
    select: (response) => mapTmdbMediaDetail(mediaType, response),
  });
}
