import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import LocalMoviesOutlinedIcon from "@mui/icons-material/LocalMoviesOutlined";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Chip,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { APP_URL } from "../const/app-url.const.ts";
import type { MediaModel } from "../models/media.model.ts";

const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

type MediaCardProps = {
  media: MediaModel;
};

export function MediaCard({ media }: MediaCardProps) {
  const posterUrl = media.posterPath
    ? `${TMDB_IMAGE_BASE_URL}/w500${media.posterPath}`
    : null;

  return (
    <Card
      component="article"
      sx={{
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "rgba(255, 255, 255, 0.08)",
        boxShadow: "0 10px 24px rgba(0, 0, 0, 0.18)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minWidth: 0,
        overflow: "hidden",
      }}
    >
      <CardActionArea
        aria-label={`View details for ${media.title}`}
        component={RouterLink}
        to={`${APP_URL.Media}/${media.id}`}
        sx={{ color: "inherit", flexGrow: 1, textAlign: "inherit" }}
      >
        <Box
          sx={{
            aspectRatio: "2 / 3",
            bgcolor: "#242424",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {posterUrl ? (
            <Box
              alt={`${media.title} poster`}
              component="img"
              loading="lazy"
              src={posterUrl}
              sx={{ height: "100%", objectFit: "cover", width: "100%" }}
            />
          ) : (
            <Box
              sx={{
                alignItems: "center",
                color: "text.secondary",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                height: "100%",
                justifyContent: "center",
                px: 2,
                textAlign: "center",
              }}
            >
              <LocalMoviesOutlinedIcon sx={{ fontSize: 44 }} />
              <Typography variant="body2">Poster unavailable</Typography>
            </Box>
          )}

          <Box
            sx={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0.48), transparent 28%)",
              display: "flex",
              inset: 0,
              justifyContent: "space-between",
              p: 1.5,
              pointerEvents: "none",
              position: "absolute",
            }}
          >
            <Chip
              label={media.mediaType === "movie" ? "Movie" : "TV series"}
              size="small"
              sx={{
                bgcolor: "rgba(16, 16, 16, 0.78)",
                color: "common.white",
              }}
            />
            <Chip
              color="primary"
              label={media.rating.toFixed(1)}
              size="small"
              sx={{ fontWeight: 700 }}
            />
          </Box>
        </Box>

        <Box sx={{ p: 2 }}>
          <Typography
            component="h3"
            sx={{
              display: "-webkit-box",
              fontSize: "1rem",
              fontWeight: 700,
              lineHeight: 1.3,
              minHeight: "2.6em",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {media.title}
          </Typography>
          <Box
            sx={{
              color: "text.secondary",
              display: "flex",
              fontSize: "0.82rem",
              justifyContent: "space-between",
              mt: 1.5,
            }}
          >
            <span>{media.releaseYear}</span>
            <span>{media.originalLanguage.toUpperCase()}</span>
          </Box>
        </Box>
      </CardActionArea>

      <Button
        startIcon={<BookmarkAddOutlinedIcon />}
        type="button"
        variant="contained"
        sx={{ m: 2, mt: 0, whiteSpace: "nowrap" }}
      >
        Add to watchlist
      </Button>
    </Card>
  );
}
