import LocalMoviesOutlinedIcon from "@mui/icons-material/LocalMoviesOutlined";
import { Box, Card, Chip, Typography } from "@mui/material";

import type { TmdbMovieModel } from "../features/tmdb/models/tmdb-movie.model.ts";
import type { TmdbTvModel } from "../features/tmdb/models/tmdb-tv.model.ts";

const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

type MediaCardProps =
  | { mediaType: "movie"; media: TmdbMovieModel }
  | { mediaType: "tv"; media: TmdbTvModel };

export function MediaCard(props: MediaCardProps) {
  const { media, mediaType } = props;

  const title = mediaType === "movie" ? media.title : media.name;
  const releaseDate =
    mediaType === "movie" ? media.release_date : media.first_air_date;
  const year = releaseDate?.slice(0, 4) || "TBA";
  const posterUrl = media.poster_path
    ? `${TMDB_IMAGE_BASE_URL}/w500${media.poster_path}`
    : null;

  return (
    <Card
      component="article"
      sx={{
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "rgba(255, 255, 255, 0.08)",
        boxShadow: "0 10px 24px rgba(0, 0, 0, 0.18)",
        minWidth: 0,
        overflow: "hidden",
      }}
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
            alt={`${title} poster`}
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
            label={mediaType === "movie" ? "Movie" : "TV series"}
            size="small"
            sx={{ bgcolor: "rgba(16, 16, 16, 0.78)", color: "common.white" }}
          />
          <Chip
            color="primary"
            label={media.vote_average.toFixed(1)}
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
          {title}
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
          <span>{year}</span>
          <span>{media.original_language.toUpperCase()}</span>
        </Box>
      </Box>
    </Card>
  );
}
