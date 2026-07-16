import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { APP_URL } from "../const/app-url.const.ts";
import type { MediaModel } from "../models/media.model.ts";

const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

type PopularMediaBannerProps = {
  imageSize?: string;
  media: MediaModel;
};

export function PopularMediaBanner(props: PopularMediaBannerProps) {
  const { imageSize = "original", media } = props;

  const backdropUrl = media.backdropPath
    ? `${TMDB_IMAGE_BASE_URL}/${imageSize}${media.backdropPath}`
    : null;
  const backdropImage = backdropUrl ? `, url(${backdropUrl})` : "";

  return (
    <Box
      sx={{
        color: "common.white",
        overflow: "hidden",
        px: { xs: 3, sm: 6, md: 10 },
        py: { xs: 6, md: 10 },
        position: "relative",
        textDecoration: "none",
        "&:focus-visible": {
          outline: "3px solid",
          outlineColor: "primary.main",
          outlineOffset: -3,
        },
      }}
    >
      <Box
        sx={{
          backgroundImage: `linear-gradient(180deg, rgba(16, 16, 16, 0.08), rgba(16, 16, 16, 0.78)), linear-gradient(90deg, rgba(8, 8, 10, 0.96) 0%, rgba(8, 8, 10, 0.82) 34%, rgba(8, 8, 10, 0.44) 100%)${backdropImage}`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          bottom: 0,
          left: 0,
          pointerEvents: "none",
          position: "absolute",
          right: 0,
          top: 0,
        }}
      />

      <Box
        sx={{
          maxWidth: { xs: "100%", md: 720 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Typography
          component="p"
          sx={{
            color: "primary.main",
            fontSize: { xs: "0.78rem", md: "0.95rem" },
            fontWeight: 700,
            letterSpacing: 3,
            lineHeight: 1,
            mb: { xs: 2, md: 3 },
          }}
        >
          IN TENDENZA
        </Typography>

        <Typography
          component="h1"
          sx={{
            fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
            fontWeight: 700,
            lineHeight: 0.95,
            mb: { xs: 2, md: 3 },
          }}
        >
          {media.title}
        </Typography>

        <Typography
          sx={{
            color: "rgba(255, 255, 255, 0.78)",
            display: "-webkit-box",
            fontSize: { xs: "1rem", md: "1.25rem" },
            fontWeight: 400,
            lineHeight: 1.45,
            maxWidth: 640,
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: { xs: 4, md: 3 },
          }}
        >
          {media.overview || "Nessuna descrizione disponibile."}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            mt: { xs: 3, md: 4 },
          }}
        >
          <Button
            component={RouterLink}
            startIcon={<InfoOutlinedIcon />}
            to={`${APP_URL.Media}/${media.mediaType}/${media.id}`}
            variant="contained"
          >
            Vedi dettagli
          </Button>
          <Button
            aria-label={`Aggiungi ${media.title} alla watchlist`}
            startIcon={<BookmarkAddOutlinedIcon />}
            variant="outlined"
          >
            Aggiungi alla watchlist
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
