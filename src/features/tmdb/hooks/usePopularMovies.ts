import { useQuery } from "@tanstack/react-query";

import { getPopularMovies } from "../client/tmdbClient.ts";

export const popularMoviesQueryKey = ["tmdb", "movie", "popular"] as const;

export function usePopularMovies() {
  return useQuery({
    queryKey: popularMoviesQueryKey,
    queryFn: getPopularMovies,
  });
}
