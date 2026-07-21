import { Box, Pagination } from "@mui/material";
import type { MediaModel } from "../models/media.model.ts";
import { MediaCard } from "./MediaCard.tsx";

type MediaListSharedProps = {
  media: MediaModel[];
  page: number;
  isFetching: boolean;
  totalPages: number;
  handlePageChange: (newPage: number) => void;
  onMediaNavigate?: () => void;
};

export function MediaList(props: MediaListSharedProps) {
  const {
    media,
    page,
    isFetching,
    totalPages,
    handlePageChange,
    onMediaNavigate,
  } = props;

  return (
    <>
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
          <MediaCard
            key={`${media.mediaType}-${media.id}`}
            media={media}
            onNavigate={onMediaNavigate}
          />
        ))}
      </Box>

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Pagination
            color="primary"
            count={totalPages}
            disabled={isFetching}
            getItemAriaLabel={(type, itemPage, selected) => {
              if (type === "page") {
                return selected
                  ? `Pagina ${itemPage}, pagina corrente`
                  : `Vai alla pagina ${itemPage}`;
              }

              const labels = {
                first: "Vai alla prima pagina",
                last: "Vai all'ultima pagina",
                next: "Vai alla pagina successiva",
                previous: "Vai alla pagina precedente",
                "start-ellipsis": "Altre pagine",
                "end-ellipsis": "Altre pagine",
              };

              return labels[type];
            }}
            onChange={(_event, newPage) => handlePageChange(newPage)}
            page={Math.min(Math.max(page, 1), totalPages)}
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </>
  );
}
