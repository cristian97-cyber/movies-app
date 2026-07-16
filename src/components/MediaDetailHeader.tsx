import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LocalMoviesOutlinedIcon from "@mui/icons-material/LocalMoviesOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { Box, Button, Chip, Typography } from "@mui/material";
import { type ReactNode, useState } from "react";

import type { MediaDetailModel } from "../models/media-detail.model.ts";
import { formatDuration } from "../utils/utils.ts";
import { MediaTrailer } from "./MediaTrailer.tsx";

const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

type MediaDetailHeaderProps = {
  media: MediaDetailModel;
};

export function MediaDetailHeader({ media }: MediaDetailHeaderProps) {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const backdropUrl = media.backdropPath
    ? `${TMDB_IMAGE_BASE_URL}/original${media.backdropPath}`
    : null;
  const posterUrl = media.posterPath
    ? `${TMDB_IMAGE_BASE_URL}/w500${media.posterPath}`
    : null;
  const formattedDuration = formatDuration(media.durationMinutes);
  const formattedVoteCount = new Intl.NumberFormat("it-IT").format(
    media.voteCount,
  );

  return (
    <Box
      component="section"
      sx={{
        color: "common.white",
        minHeight: { md: 600 },
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          backgroundColor: "#101010",
          backgroundImage: backdropUrl
            ? `linear-gradient(180deg, rgba(16, 16, 16, 0.12) 0%, #101010 100%), linear-gradient(90deg, rgba(8, 8, 10, 0.96) 0%, rgba(8, 8, 10, 0.72) 48%, rgba(8, 8, 10, 0.32) 100%), url(${backdropUrl})`
            : "linear-gradient(135deg, #162523 0%, #101010 55%, #181818 100%)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          inset: 0,
          pointerEvents: "none",
          position: "absolute",
        }}
      />

      <Box
        sx={{
          alignItems: { xs: "center", md: "flex-end" },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, md: 6 },
          margin: "0 auto",
          maxWidth: 1320,
          px: { xs: 2, sm: 4, md: 6 },
          py: { xs: 5, md: 8 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            aspectRatio: "2 / 3",
            bgcolor: "background.paper",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            borderRadius: 1,
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.48)",
            flexShrink: 0,
            overflow: "hidden",
            width: { xs: 200, sm: 240, md: 280 },
          }}
        >
          {posterUrl ? (
            <Box
              alt={`Locandina di ${media.title}`}
              component="img"
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
                gap: 1.5,
                height: "100%",
                justifyContent: "center",
                px: 2,
                textAlign: "center",
              }}
            >
              <LocalMoviesOutlinedIcon sx={{ fontSize: 52 }} />
              <Typography variant="body2">Locandina non disponibile</Typography>
            </Box>
          )}
        </Box>

        <Box
          sx={{
            maxWidth: 760,
            pb: { md: 1 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            component="p"
            sx={{
              color: "primary.main",
              fontSize: "0.85rem",
              fontWeight: 800,
              letterSpacing: 2.5,
              mb: 2,
            }}
          >
            {media.mediaType === "movie" ? "FILM" : "SERIE TV"}
          </Typography>

          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "2.25rem", sm: "3.25rem", md: "4rem" },
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {media.title}
          </Typography>

          <Box
            sx={{
              alignItems: "center",
              color: "rgba(255, 255, 255, 0.74)",
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 2, sm: 3 },
              justifyContent: { xs: "center", md: "flex-start" },
              mt: 3,
            }}
          >
            <MetadataItem
              icon={<CalendarMonthOutlinedIcon fontSize="small" />}
              label={media.releaseYear}
            />
            {formattedDuration ? (
              <MetadataItem
                icon={<AccessTimeOutlinedIcon fontSize="small" />}
                label={formattedDuration}
              />
            ) : null}
          </Box>

          {media.genres.length > 0 ? (
            <Box
              aria-label="Generi"
              component="ul"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                justifyContent: { xs: "center", md: "flex-start" },
                listStyle: "none",
                m: 0,
                mt: 3,
                p: 0,
              }}
            >
              {media.genres.map((genre) => (
                <Chip
                  component="li"
                  key={genre.id}
                  label={genre.name}
                  size="small"
                  variant="outlined"
                  sx={{
                    bgcolor: "rgba(0, 184, 169, 0.08)",
                    borderColor: "secondary.main",
                    color: "secondary.light",
                  }}
                />
              ))}
            </Box>
          ) : null}

          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              gap: 1.5,
              justifyContent: { xs: "center", md: "flex-start" },
              mt: 3,
            }}
          >
            <StarRoundedIcon color="primary" sx={{ fontSize: 32 }} />
            <Typography
              component="span"
              sx={{ fontSize: "1.5rem", fontWeight: 800 }}
            >
              {media.rating.toFixed(1)}
            </Typography>
            <Box
              aria-hidden="true"
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.28)",
                height: 28,
                width: "1px",
              }}
            />
            <Typography color="rgba(255, 255, 255, 0.68)" variant="body2">
              {formattedVoteCount} voti
            </Typography>
          </Box>

          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.78)",
              display: "-webkit-box",
              fontSize: { xs: "1rem", md: "1.15rem" },
              lineHeight: 1.6,
              mt: 3,
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: { xs: 3, md: 2 },
            }}
          >
            {media.overview || "Nessuna descrizione disponibile."}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: { xs: "center", md: "flex-start" },
              mt: 4,
            }}
          >
            <Button
              aria-label={`Aggiungi ${media.title} alla watchlist`}
              startIcon={<BookmarkAddOutlinedIcon />}
              type="button"
              variant="contained"
            >
              Aggiungi alla watchlist
            </Button>
            <Button
              aria-label={`Guarda il trailer di ${media.title}`}
              color="secondary"
              disabled={media.trailer === null}
              onClick={() => setIsTrailerOpen(true)}
              startIcon={<PlayArrowOutlinedIcon />}
              type="button"
              variant="outlined"
            >
              Guarda il trailer
            </Button>
          </Box>
        </Box>
      </Box>
      <MediaTrailer
        onClose={() => setIsTrailerOpen(false)}
        open={isTrailerOpen}
        title={media.title}
        trailerUrl={media.trailer}
      />
    </Box>
  );
}

type MetadataItemProps = {
  icon: ReactNode;
  label: string;
};

export function MetadataItem({ icon, label }: MetadataItemProps) {
  return (
    <Box sx={{ alignItems: "center", display: "flex", gap: 1 }}>
      {icon}
      <Typography component="span" variant="body1">
        {label}
      </Typography>
    </Box>
  );
}
