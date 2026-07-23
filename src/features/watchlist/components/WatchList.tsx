import BookmarkIcon from "@mui/icons-material/Bookmark";
import CloseIcon from "@mui/icons-material/Close";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useWatchList } from "../hooks/useWatchList.ts";
import type { WatchListItemModel } from "../models/watch-list-item.model.ts";
import { WatchListItem } from "./WatchListItem.tsx";

const ITEMS_PER_PAGE = 4;

type WatchListProps = {
  open: boolean;
  onClose: () => void;
};

function getPaginationLabel(
  type:
    | "page"
    | "first"
    | "last"
    | "next"
    | "previous"
    | "start-ellipsis"
    | "end-ellipsis",
  page: number | null,
  selected: boolean,
) {
  if (type === "page") {
    return selected ? `Pagina ${page}, selezionata` : `Vai alla pagina ${page}`;
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
}

export function WatchList({ open, onClose }: WatchListProps) {
  const { clear, items: watchList, remove } = useWatchList();

  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(watchList.length / ITEMS_PER_PAGE);
  const pageItems = watchList.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  function handleRemove(item: WatchListItemModel) {
    const nextTotalPages = Math.ceil((watchList.length - 1) / ITEMS_PER_PAGE);

    setPage((currentPage) =>
      Math.min(currentPage, Math.max(nextTotalPages, 1)),
    );
    remove(item.id, item.mediaType);
  }

  function handleClear() {
    setPage(1);
    clear();
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          "aria-labelledby": "watchlist-title",
          sx: {
            bgcolor: "background.paper",
            backgroundImage:
              "linear-gradient(145deg, rgba(0, 184, 169, 0.05), transparent 34%)",
            boxShadow: "-18px 0 48px rgba(0, 0, 0, 0.48)",
            display: "flex",
            maxWidth: "100vw",
            width: { xs: "100vw", sm: 480 },
          },
        },
      }}
    >
      <Box
        component="header"
        sx={{
          flexShrink: 0,
          px: { xs: 2, sm: 3 },
          pb: 2.5,
          pt: { xs: 2, sm: 3 },
        }}
      >
        <Box sx={{ alignItems: "center", display: "flex", gap: 1.5 }}>
          <BookmarkIcon color="primary" />
          <Typography
            component="h2"
            id="watchlist-title"
            sx={{ fontSize: "1.5rem", fontWeight: 800 }}
          >
            La tua watchlist
          </Typography>
          <Chip
            label={`${watchList.length} titoli`}
            size="small"
            sx={{ ml: 0.5 }}
          />
          <IconButton
            aria-label="Chiudi la watchlist"
            onClick={onClose}
            sx={{ ml: "auto" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            gap: 1,
            mt: 1.5,
          }}
        >
          <Typography
            sx={{ color: "text.secondary", flexGrow: 1 }}
            variant="body2"
          >
            I titoli che vuoi guardare, tutti in un unico posto.
          </Typography>
          <Button
            aria-label="Svuota la watchlist"
            color="error"
            disabled={watchList.length === 0}
            onClick={handleClear}
            size="small"
            startIcon={<DeleteSweepOutlinedIcon />}
            sx={{ flexShrink: 0 }}
            type="button"
          >
            Svuota
          </Button>
        </Box>
      </Box>

      <Divider />

      <Stack
        component="ul"
        spacing={2}
        sx={{
          flexGrow: 1,
          listStyle: "none",
          m: 0,
          minHeight: 0,
          overflowY: "auto",
          p: { xs: 2, sm: 3 },
        }}
      >
        {pageItems.length === 0 && (
          <Typography
            color="textSecondary"
            variant="body2"
            sx={{ textAlign: "center" }}
          >
            Non hai ancora aggiunto nessun titolo alla watchlist
          </Typography>
        )}
        {pageItems.map((item) => (
          <WatchListItem
            item={item}
            key={`${item.mediaType}:${item.id}`}
            onNavigate={onClose}
            onRemove={handleRemove}
          />
        ))}
      </Stack>

      <Divider />

      {watchList.length > 0 && (
        <Box
          component="footer"
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            gap: 1,
            px: 2,
            py: { xs: 2, sm: 3 },
          }}
        >
          <Pagination
            aria-label="Paginazione della watchlist"
            color="primary"
            count={totalPages}
            getItemAriaLabel={getPaginationLabel}
            page={page}
            onChange={(_, nextPage) => setPage(nextPage)}
            shape="rounded"
            siblingCount={0}
          />
        </Box>
      )}
    </Drawer>
  );
}
