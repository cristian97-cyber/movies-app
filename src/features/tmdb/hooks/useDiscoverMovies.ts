import { useQuery } from "@tanstack/react-query";
import { discoverMovies } from "../client/tmdbClient.ts";

export function useDiscoverMovies() {
  return useQuery({
    queryKey: ["tmdb", "discover", "movie"],
    queryFn: discoverMovies,
  });
}
