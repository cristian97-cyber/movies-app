import { Box, Pagination, Typography } from "@mui/material";
import type { ChangeEvent } from "react";
import type { MediaModel } from "../models/media.model.ts";
import { MediaCard } from "./MediaCard.tsx";

type MediaListSharedProps = {
  media: MediaModel[];
  page: number;
  isFetching: boolean;
  totalPages: number;
  totalResults: number;
  handlePageChange: (_event: ChangeEvent<unknown>, newPage: number) => void;
};

export function MediaList(props: MediaListSharedProps) {
  const {
    media,
    page,
    isFetching,
    totalPages,
    totalResults,
    handlePageChange,
  } = props;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Typography color="text.secondary" variant="body2">
          {totalResults.toLocaleString()} results
        </Typography>
      </Box>

      <Box
        aria-busy={isFetching}
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            sm: "repeat(2, minmax(0, 1fr))",
            md: "repeat(3, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
            xl: "repeat(5, minmax(0, 1fr))",
          },
          opacity: isFetching ? 0.6 : 1,
          transition: "opacity 160ms ease",
        }}
      >
        {media.map((media) => (
          <MediaCard key={media.id} media={media} />
        ))}
      </Box>

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Pagination
            color="primary"
            count={totalPages}
            disabled={isFetching}
            onChange={handlePageChange}
            page={Math.min(Math.max(page, 1), totalPages)}
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </>
  );
}
