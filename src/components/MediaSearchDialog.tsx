import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  AlertTitle,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";

import { useSearchMedia } from "../features/tmdb/hooks/useSearchMedia.ts";
import { LoadingSpinner } from "./LoadingSpinner.tsx";
import { MediaList } from "./MediaList.tsx";
import { useEffect, useRef, useState } from "react";

type MediaSearchDialogProps = {
  searchQuery: string;
  onClose: () => void;
};

export function MediaSearchDialog({
  searchQuery,
  onClose,
}: MediaSearchDialogProps) {
  const [page, setPage] = useState(1);

  const dialogContentRef = useRef<HTMLDivElement>(null);

  const normalizedQuery = searchQuery.trim();

  const searchMediaQuery = useSearchMedia(normalizedQuery, page);

  const media = searchMediaQuery.data?.results ?? [];
  const hasResults = !searchMediaQuery.isLoading && media.length > 0;
  const hasNoResults =
    !searchMediaQuery.isLoading &&
    !searchMediaQuery.isError &&
    media.length === 0;

  useEffect(() => {
    dialogContentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  function handlePageChange(newPage: number) {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    setPage(newPage);
  }

  function handleClose() {
    setPage(1);
    onClose();
  }

  return (
    <Dialog
      aria-labelledby="media-search-dialog-title"
      fullScreen
      onClose={onClose}
      open={normalizedQuery.length > 0}
      slotProps={{
        paper: {
          sx: { bgcolor: "background.default" },
        },
      }}
    >
      <DialogTitle id="media-search-dialog-title" sx={{ pr: 8 }}>
        Risultati per “{normalizedQuery}”
      </DialogTitle>
      <IconButton
        aria-label="Chiudi i risultati della ricerca"
        onClick={handleClose}
        sx={{ position: "absolute", right: 16, top: 12 }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent
        dividers
        ref={dialogContentRef}
        sx={{ px: { xs: 2, sm: 4, md: 6 }, py: { xs: 3, md: 5 } }}
      >
        {searchMediaQuery.isLoading && <LoadingSpinner />}

        {searchMediaQuery.isError && (
          <Alert severity="error" variant="outlined">
            <AlertTitle>Impossibile completare la ricerca</AlertTitle>
            Si è verificato un errore durante la ricerca dei titoli. Riprova più
            tardi.
          </Alert>
        )}

        {hasNoResults && (
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
              Nessun titolo trovato
            </Typography>
            <Typography variant="body2">
              Prova a cercare un titolo diverso.
            </Typography>
          </Box>
        )}

        {hasResults && searchMediaQuery.data && (
          <MediaList
            handlePageChange={handlePageChange}
            isFetching={searchMediaQuery.isFetching}
            media={media}
            onMediaNavigate={onClose}
            page={page}
            totalPages={searchMediaQuery.data.totalPages}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
