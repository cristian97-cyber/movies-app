import LocalMoviesOutlinedIcon from "@mui/icons-material/LocalMoviesOutlined";
import { Box, Card, CardActionArea } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { APP_URL } from "../const/app-url.const.ts";
import type { MediaModel } from "../models/media.model.ts";

const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

type RecommendedMediaProps = {
  media: MediaModel;
};

export function RecommendedMedia({ media }: RecommendedMediaProps) {
  const posterUrl = media.posterPath
    ? `${TMDB_IMAGE_BASE_URL}/w342${media.posterPath}`
    : null;

  return (
    <Card
      component="li"
      sx={{
        bgcolor: "#202020",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 10px 24px rgba(0, 0, 0, 0.18)",
        minWidth: 0,
        overflow: "hidden",
      }}
    >
      <CardActionArea
        aria-label={`Visualizza i dettagli di ${media.title}`}
        component={RouterLink}
        to={`${APP_URL.Media}/${media.mediaType}/${media.id}`}
        sx={{ height: "100%" }}
      >
        <Box
          sx={{
            aspectRatio: "2 / 3",
            bgcolor: "#282828",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {posterUrl ? (
            <Box
              alt={`Locandina di ${media.title}`}
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
                height: "100%",
                justifyContent: "center",
              }}
            >
              <LocalMoviesOutlinedIcon sx={{ fontSize: 40 }} />
            </Box>
          )}
        </Box>
      </CardActionArea>
    </Card>
  );
}
