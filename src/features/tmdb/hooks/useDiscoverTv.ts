import { useQuery } from "@tanstack/react-query";
import { discoverTv } from "../client/tmdbClient.ts";

export function useDiscoverTv() {
  return useQuery({
    queryKey: ["tmdb", "discover", "tv"],
    queryFn: discoverTv,
  });
}
