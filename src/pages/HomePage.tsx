import { Alert, AlertTitle, Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { LoadingSpinner } from "../components/LoadingSpinner.tsx";
import { PopularMediaBanner } from "../components/PopularMediaBanner.tsx";
import { useDiscoverMedia } from "../features/tmdb/hooks/useDiscoverMedia.ts";
import { usePopularMedia } from "../features/tmdb/hooks/usePopularMedia.ts";
import type { TmdbMediaType } from "../features/tmdb/types/tmdb-media.type.ts";
import { MediaList } from "../components/MediaList.tsx";
import { MediaFilters } from "../components/MediaFilters.tsx";
import { useMediaGenres } from "../features/tmdb/hooks/useMediaGenres.ts";
import type { TmdbSortByType } from "../features/tmdb/types/tmdb-sort-by.type.ts";

export function HomePage() {
  const [itemRandomSeed] = useState(() => Math.random());
  const [bannerMediaType] = useState<TmdbMediaType>(() =>
    Math.random() < 0.5 ? "movie" : "tv",
  );
  const [listPage, setListPage] = useState(1);
  const [listMediaType, setListMediaType] = useState<TmdbMediaType>("movie");
  const [listGenre, setListGenre] = useState<string>("");
  const [listSortBy, setListSortBy] =
    useState<TmdbSortByType>("popularity.desc");

  const previousListPage = useRef(listPage);
  const sectionRef = useRef<HTMLElement>(null);

  const popularMediaQuery = usePopularMedia(bannerMediaType);
  const discoverMediaQuery = useDiscoverMedia(
    listMediaType,
    listPage,
    listGenre,
    listSortBy,
  );
  const genresQuery = useMediaGenres(listMediaType);

  useEffect(() => {
    if (previousListPage.current === listPage) {
      return;
    }

    previousListPage.current = listPage;
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [listPage]);

  const popularMedia = popularMediaQuery.data?.results.at(
    Math.floor(itemRandomSeed * popularMediaQuery.data?.results.length),
  );

  const contentType = listMediaType === "movie" ? "film" : "serie TV";
  const isThereMedia =
    !discoverMediaQuery.isLoading &&
    !discoverMediaQuery.isError &&
    discoverMediaQuery.data &&
    discoverMediaQuery.data.results &&
    discoverMediaQuery.data.results.length > 0;

  const handleListPageChange = function (page: number) {
    setListPage(page);
  };

  const handleMediaTypeChange = function (mediaType: TmdbMediaType) {
    setListMediaType(mediaType);
  };

  const handleListGenreChange = function (genre: string) {
    setListGenre(genre);
  };

  const handleListSortByChange = function (orderBy: TmdbSortByType) {
    setListSortBy(orderBy);
  };

  return (
    <Box>
      {popularMediaQuery.isLoading && <LoadingSpinner />}
      {popularMediaQuery.isError && (
        <Alert severity="error" variant="outlined" sx={{ m: 3 }}>
          <AlertTitle>Impossibile caricare i contenuti in evidenza</AlertTitle>
          Si è verificato un errore durante il caricamento dei contenuti
          popolari. Riprova più tardi.
        </Alert>
      )}

      {popularMedia && <PopularMediaBanner media={popularMedia} />}

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
          <MediaFilters
            mediaType={listMediaType}
            genre={listGenre}
            sortBy={listSortBy}
            genres={genresQuery.data ?? []}
            totalResults={discoverMediaQuery.data?.totalResults ?? 0}
            handleMediaTypeChange={handleMediaTypeChange}
            handleGenreChange={handleListGenreChange}
            handleSortByChange={handleListSortByChange}
          />

          {discoverMediaQuery.isLoading && <LoadingSpinner />}
          {discoverMediaQuery.isError && (
            <Alert severity="error" variant="outlined">
              <AlertTitle>Impossibile caricare {contentType}</AlertTitle>
              Si è verificato un errore durante il caricamento. Riprova più
              tardi.
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
                Nessun contenuto trovato
              </Typography>
              <Typography variant="body2">
                Non ci sono {contentType} per i filtri selezionati.
              </Typography>
            </Box>
          )}

          {isThereMedia && (
            <MediaList
              media={discoverMediaQuery.data.results}
              page={listPage}
              isFetching={discoverMediaQuery.isFetching}
              totalPages={discoverMediaQuery.data.totalPages}
              handlePageChange={handleListPageChange}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
