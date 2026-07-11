import { Alert, AlertTitle, Box, Typography } from "@mui/material";
import { type ChangeEvent, useEffect, useRef, useState } from "react";

import { LoadingSpinner } from "../components/LoadingSpinner.tsx";
import { PopularMediaBanner } from "../components/PopularMediaBanner.tsx";
import { useDiscoverMedia } from "../features/tmdb/hooks/useDiscoverMedia.ts";
import { usePopularMedia } from "../features/tmdb/hooks/usePopularMedia.ts";
import type { TmdbMediaType } from "../features/tmdb/types/tmdb-media.type.ts";
import { MediaList } from "../components/MediaList.tsx";
import type { TmdbMovieModel } from "../features/tmdb/models/tmdb-movie.model.ts";
import type { TmdbTvModel } from "../features/tmdb/models/tmdb-tv.model.ts";

const ITEMS_FOR_PAGE = 20;

export function HomePage() {
  const [itemRandomSeed] = useState(() => Math.random());
  const [bannerMediaType] = useState<TmdbMediaType>(() =>
    Math.random() < 0.5 ? "movie" : "tv",
  );
  const [listPage, setListPage] = useState(1);
  const [listMediaType] = useState<TmdbMediaType>("movie");

  const sectionRef = useRef<HTMLElement>(null);

  const popularMediaQuery = usePopularMedia(bannerMediaType);
  const discoverMediaQuery = useDiscoverMedia(listMediaType, listPage);

  const popularMedia = popularMediaQuery.data?.results.at(
    Math.floor(itemRandomSeed * popularMediaQuery.data?.results.length),
  );

  const contentType = listMediaType === "movie" ? "movies" : "TV series";
  const isThereMedia =
    !discoverMediaQuery.isLoading &&
    !discoverMediaQuery.isError &&
    discoverMediaQuery.data &&
    discoverMediaQuery.data.results &&
    discoverMediaQuery.data.results.length > 0;

  const handleListPageChange = function (
    _event: ChangeEvent<unknown>,
    page: number,
  ) {
    setListPage(page);
  };

  useEffect(() => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [listPage]);

  return (
    <Box>
      {popularMediaQuery.isLoading && <LoadingSpinner />}
      {popularMediaQuery.isError && (
        <Alert severity="error" variant="outlined" sx={{ m: 3 }}>
          <AlertTitle>Unable to load featured content</AlertTitle>
          An error occurred while loading popular content. Please try again
          later.
        </Alert>
      )}

      {popularMedia && bannerMediaType === "movie" && (
        <PopularMediaBanner
          media={popularMedia as TmdbMovieModel}
          mediaType="movie"
        />
      )}
      {popularMedia && bannerMediaType === "tv" && (
        <PopularMediaBanner
          media={popularMedia as TmdbTvModel}
          mediaType="tv"
        />
      )}

      <Box
        component="section"
        ref={sectionRef}
        sx={{
          px: { xs: 2, sm: 4, md: 6 },
          py: { xs: 4, md: 6 },
          scrollMarginTop: { xs: 152, sm: 112 },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box>
            <Typography component="h2" variant="h4" sx={{ mb: 1 }}>
              Discover {contentType}
            </Typography>
            <Typography color="text.secondary" variant="body1">
              Explore titles selected from the TMDB catalog.
            </Typography>
          </Box>

          {discoverMediaQuery.isLoading && <LoadingSpinner />}
          {discoverMediaQuery.isError && (
            <Alert severity="error" variant="outlined">
              <AlertTitle>Unable to load {contentType}</AlertTitle>
              An error occurred while loading {contentType}. Please try again
              later.
            </Alert>
          )}
          {!isThereMedia && (
            <Box
              sx={{
                border: "1px dashed",
                borderColor: "divider",
                borderRadius: 1,
                color: "text.secondary",
                py: 10,
                textAlign: "center",
              }}
            >
              <Typography sx={{ fontWeight: 700 }}>
                No {contentType} found
              </Typography>
              <Typography variant="body2">
                There are no movies for the selected filters
              </Typography>
            </Box>
          )}

          {isThereMedia && listMediaType === "movie" && (
            <MediaList
              media={discoverMediaQuery.data.results as TmdbMovieModel[]}
              mediaType="movie"
              page={listPage}
              isFetching={discoverMediaQuery.isFetching}
              totalPages={Math.min(discoverMediaQuery.data.total_pages, 500)}
              totalResults={Math.min(
                discoverMediaQuery.data.total_results,
                ITEMS_FOR_PAGE * 500,
              )}
              handlePageChange={handleListPageChange}
            />
          )}
          {isThereMedia && listMediaType === "tv" && (
            <MediaList
              media={discoverMediaQuery.data.results as TmdbTvModel[]}
              mediaType="tv"
              page={listPage}
              isFetching={discoverMediaQuery.isFetching}
              totalPages={Math.min(discoverMediaQuery.data.total_pages, 500)}
              totalResults={Math.min(
                discoverMediaQuery.data.total_results,
                ITEMS_FOR_PAGE * 500,
              )}
              handlePageChange={handleListPageChange}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
