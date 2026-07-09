import { Alert, AlertTitle, Box } from "@mui/material";

import { LoadingSpinner } from "../components/LoadingSpinner.tsx";
import { FeaturedMovieBanner } from "../components/FeaturedMovieBanner.tsx";
import { usePopularMovies } from "../features/tmdb/hooks/usePopularMovies.ts";

const featuredMovieRandomSeed = Math.random();

export function HomePage() {
  const popularMoviesQuery = usePopularMovies();

  const featuredMovie = popularMoviesQuery.data?.results
    .filter((movie) => movie.backdrop_path)
    .at(
      Math.floor(
        featuredMovieRandomSeed * popularMoviesQuery.data?.results.length,
      ),
    );

  const isLoading = popularMoviesQuery.isLoading;
  const isError = popularMoviesQuery.isError;

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
    <Box>{featuredMovie && <FeaturedMovieBanner movie={featuredMovie} />}</Box>
  );
}
