import { Alert, AlertTitle, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { LoadingSpinner } from "../components/LoadingSpinner.tsx";
import { MediaDetailHeader } from "../components/MediaDetailHeader.tsx";
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
          <AlertTitle>Unable to load media details</AlertTitle>
          An error occurred while loading this title. Please try again later.
        </Alert>
      )}

      {mediaDetailQuery.data && (
        <MediaDetailHeader media={mediaDetailQuery.data} />
      )}
    </Box>
  );
}
