import type { TmdbMediaType } from "../types/tmdb-media.type.ts";
import { useQuery } from "@tanstack/react-query";
import { getMediaGenres } from "../client/tmdbClient.ts";
import { mapTmdbGenres } from "../mappers/tmdb-genre.mapper.ts";

export function useMediaGenres(mediaType: TmdbMediaType) {
  return useQuery({
    queryKey: ["tmdb", "genre", mediaType, "list"],
    queryFn: () => getMediaGenres(mediaType),
    select: (response) => mapTmdbGenres(response),
  });
}
