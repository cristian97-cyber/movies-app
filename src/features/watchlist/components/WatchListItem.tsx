import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LocalMoviesOutlinedIcon from "@mui/icons-material/LocalMoviesOutlined";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { Box, Chip, IconButton, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { APP_URL } from "../../../core/const/app-url.const.ts";
import type { WatchListItemModel } from "../models/watch-list-item.model.ts";

const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

type WatchListItemProps = {
  item: WatchListItemModel;
  onNavigate: () => void;
  onRemove: (item: WatchListItemModel) => void;
};

export function WatchListItem({
  item,
  onNavigate,
  onRemove,
}: WatchListItemProps) {
  const posterUrl =
    item.posterPath && TMDB_IMAGE_BASE_URL
      ? `${TMDB_IMAGE_BASE_URL}/w185${item.posterPath}`
      : null;
  const mediaTypeLabel = item.mediaType === "movie" ? "Film" : "Serie TV";

  return (
    <Box
      component="li"
      sx={{
        alignItems: "center",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: 2,
        display: "flex",
        gap: { xs: 1, sm: 2 },
        minHeight: { xs: 98, sm: 122 },
        overflow: "hidden",
        p: 1.5,
        transition: "border-color 160ms ease, background-color 160ms ease",
        "&:hover": {
          bgcolor: "rgba(0, 184, 169, 0.04)",
          borderColor: "secondary.main",
        },
      }}
    >
      <Box
        aria-label={`Visualizza i dettagli di ${item.title}`}
        component={RouterLink}
        onClick={onNavigate}
        to={`${APP_URL.Media}/${item.mediaType}/${item.id}`}
        sx={{
          alignItems: "center",
          alignSelf: "stretch",
          borderRadius: 2,
          color: "inherit",
          display: "flex",
          flexGrow: 1,
          gap: { xs: 1, sm: 2 },
          minWidth: 0,
          textDecoration: "none",
          "&:focus-visible": {
            outline: "3px solid",
            outlineColor: "primary.main",
            outlineOffset: 2,
          },
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            bgcolor: "#242424",
            borderRadius: 1,
            display: "flex",
            flexShrink: 0,
            height: { xs: 72, sm: 96 },
            justifyContent: "center",
            overflow: "hidden",
            width: { xs: 48, sm: 64 },
          }}
        >
          {posterUrl ? (
            <Box
              alt={`Locandina di ${item.title}`}
              component="img"
              loading="lazy"
              src={posterUrl}
              sx={{ height: "100%", objectFit: "cover", width: "100%" }}
            />
          ) : (
            <LocalMoviesOutlinedIcon color="disabled" />
          )}
        </Box>

        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontWeight: 700,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {mediaTypeLabel} · {item.releaseYear}
          </Typography>
        </Box>

        <Chip
          color="primary"
          icon={<StarRoundedIcon />}
          label={item.rating.toFixed(1)}
          size="small"
          sx={{
            flexShrink: 0,
            fontWeight: 800,
            "& .MuiChip-icon": {
              fontSize: { xs: "1rem", sm: "1.125rem" },
              ml: { xs: 0.5, sm: 0.75 },
            },
            "& .MuiChip-label": {
              px: { xs: 0.75, sm: 1 },
            },
          }}
        />
      </Box>

      <IconButton
        aria-label={`Rimuovi ${item.title} dalla watchlist`}
        onClick={() => onRemove(item)}
        sx={{
          border: "1px solid rgba(255, 255, 255, 0.2)",
          flexShrink: 0,
        }}
      >
        <DeleteOutlineIcon />
      </IconButton>
    </Box>
  );
}
