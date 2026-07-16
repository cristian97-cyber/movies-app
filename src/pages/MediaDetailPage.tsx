import { Alert, AlertTitle, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { LoadingSpinner } from "../components/LoadingSpinner.tsx";
import { MediaDetailHeader } from "../components/MediaDetailHeader.tsx";
import { MovieDetailContent } from "../components/MovieDetailContent.tsx";
import { useMediaDetail } from "../features/tmdb/hooks/useMediaDetail.ts";
import type { TmdbMediaType } from "../features/tmdb/types/tmdb-media.type.ts";

type Params = {
  mediaType: string;
  id: string;
};

export function MediaDetailPage() {
  const { mediaType, id } = useParams<Params>();

  const mediaDetailQuery = useMediaDetail(
    mediaType as TmdbMediaType,
    Number(id),
  );

  return (
    <Box>
      {mediaDetailQuery.isLoading && <LoadingSpinner />}
      {mediaDetailQuery.isError && (
        <Alert severity="error" variant="outlined" sx={{ m: 3 }}>
          <AlertTitle>Impossibile caricare i dettagli</AlertTitle>
          Si è verificato un errore durante il caricamento del titolo. Riprova
          più tardi.
        </Alert>
      )}

      {mediaDetailQuery.data && (
        <>
          <MediaDetailHeader media={mediaDetailQuery.data} />
          <MovieDetailContent media={mediaDetailQuery.data} />
        </>
      )}
    </Box>
  );
}
