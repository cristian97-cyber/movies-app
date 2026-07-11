import { Alert, AlertTitle, Box } from "@mui/material";
import { useState } from "react";

import { LoadingSpinner } from "../components/LoadingSpinner.tsx";
import { PopularMediaBanner } from "../components/PopularMediaBanner.tsx";
import { usePopularMedia } from "../features/tmdb/hooks/usePopularMedia.ts";
import type { TmdbMediaType } from "../features/tmdb/types/tmdb-media.type.ts";

export function HomePage() {
  const [itemRandomSeed] = useState(() => Math.random());
  const [mediaType] = useState<TmdbMediaType>(() =>
    Math.random() < 0.5 ? "movie" : "tv",
  );

  const popularMediaQuery = usePopularMedia(mediaType);

  const popularMedia = popularMediaQuery.data?.results.at(
    Math.floor(itemRandomSeed * popularMediaQuery.data?.results.length),
  );

  const isLoading = popularMediaQuery.isLoading;
  const isError = popularMediaQuery.isError;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <Alert severity="error" variant="outlined">
        <AlertTitle>Unable to load movies</AlertTitle>
        An error occurred while loading movies, please try again later.
      </Alert>
    );
  }

  return (
    <Box>
      {popularMedia && mediaType === "movie" && "title" in popularMedia && (
        <PopularMediaBanner media={popularMedia} mediaType="movie" />
      )}
      {popularMedia && mediaType === "tv" && "name" in popularMedia && (
        <PopularMediaBanner media={popularMedia} mediaType="tv" />
      )}
    </Box>
  );
}
