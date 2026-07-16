import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import TheatersOutlinedIcon from "@mui/icons-material/TheatersOutlined";
import { Box, Divider, Typography } from "@mui/material";
import type { ReactNode } from "react";

import type { MediaDetailModel } from "../models/media-detail.model.ts";
import { CastMember } from "./CastMember.tsx";
import { RecommendedMedia } from "./RecommendedMedia.tsx";
import { formatLanguage, formatMediaStatus } from "../utils/utils.ts";

type MovieDetailContentProps = {
  media: MediaDetailModel;
};

export function MovieDetailContent({ media }: MovieDetailContentProps) {
  const language = formatLanguage(media.originalLanguage);
  const production =
    media.productionCompanies
      .map((company) => company.name.trim())
      .filter(Boolean)
      .join(", ") || "Non disponibile";
  const featuredCast = media.cast.slice(0, 4);
  const recommendedMedia = media.recommendations.results.slice(0, 4);

  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        gridTemplateColumns: {
          xs: "1fr",
          lg: "minmax(0, 2fr) minmax(320px, 1fr)",
        },
        margin: "0 auto",
        maxWidth: 1320,
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 4, md: 6 },
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}
      >
        <Box
          component="section"
          sx={{
            bgcolor: "background.paper",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 1,
            boxShadow: "0 16px 36px rgba(0, 0, 0, 0.18)",
            p: { xs: 3, md: 4 },
          }}
        >
          <Typography
            component="h2"
            sx={{ fontSize: "1.4rem", fontWeight: 700 }}
          >
            Trama
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              fontSize: { xs: "1rem", md: "1.08rem" },
              lineHeight: 1.7,
              mt: 2,
            }}
          >
            {media.overview || "Nessuna trama disponibile."}
          </Typography>
        </Box>

        <Box
          component="section"
          sx={{
            bgcolor: "background.paper",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 1,
            boxShadow: "0 16px 36px rgba(0, 0, 0, 0.18)",
            p: { xs: 3, md: 4 },
          }}
        >
          <Typography
            component="h2"
            sx={{ fontSize: "1.4rem", fontWeight: 700 }}
          >
            Cast
          </Typography>

          {featuredCast.length > 0 ? (
            <Box
              component="ul"
              sx={{
                display: "grid",
                gap: { xs: 3, sm: 4 },
                gridTemplateColumns: {
                  xs: "repeat(2, minmax(0, 1fr))",
                  md: "repeat(4, minmax(0, 1fr))",
                },
                listStyle: "none",
                m: 0,
                mt: 3,
                p: 0,
              }}
            >
              {featuredCast.map((member) => (
                <CastMember key={member.id} member={member} />
              ))}
            </Box>
          ) : (
            <Typography color="text.secondary" sx={{ mt: 2 }}>
              Nessuna informazione sul cast disponibile.
            </Typography>
          )}
        </Box>

        <Box
          component="section"
          sx={{
            bgcolor: "background.paper",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 1,
            boxShadow: "0 16px 36px rgba(0, 0, 0, 0.18)",
            p: { xs: 3, md: 4 },
          }}
        >
          <Typography
            component="h2"
            sx={{ fontSize: "1.4rem", fontWeight: 700 }}
          >
            Potrebbero piacerti anche
          </Typography>

          {recommendedMedia.length > 0 ? (
            <Box
              component="ul"
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: {
                  xs: "repeat(2, minmax(0, 1fr))",
                  md: "repeat(4, minmax(0, 1fr))",
                },
                listStyle: "none",
                m: 0,
                mt: 3,
                p: 0,
              }}
            >
              {recommendedMedia.map((recommendation) => (
                <RecommendedMedia
                  key={recommendation.id}
                  media={recommendation}
                />
              ))}
            </Box>
          ) : (
            <Typography color="text.secondary" sx={{ mt: 2 }}>
              Nessun contenuto consigliato disponibile.
            </Typography>
          )}
        </Box>
      </Box>

      <Box
        component="section"
        sx={{
          bgcolor: "background.paper",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 1,
          boxShadow: "0 16px 36px rgba(0, 0, 0, 0.18)",
          overflow: "hidden",
        }}
      >
        <Typography
          component="h2"
          sx={{ fontSize: "1.4rem", fontWeight: 700, px: 3, py: 2.5 }}
        >
          Dettagli
        </Typography>
        <Divider />
        <Box sx={{ px: 3 }}>
          <MediaFactRow
            icon={<TheatersOutlinedIcon />}
            label="Titolo originale"
            value={media.originalTitle || media.title}
          />
          <MediaFactRow
            icon={<RadioButtonCheckedOutlinedIcon />}
            label="Stato"
            value={formatMediaStatus(media.status)}
          />
          <MediaFactRow
            icon={<CalendarMonthOutlinedIcon />}
            label="Uscita"
            value={media.releaseYear}
          />
          <MediaFactRow
            icon={<LanguageOutlinedIcon />}
            label="Lingua"
            value={language}
          />
          <MediaFactRow
            icon={<BusinessOutlinedIcon />}
            label="Produzione"
            value={production}
            withDivider={false}
          />
        </Box>
      </Box>
    </Box>
  );
}

type MediaFactRowProps = {
  icon: ReactNode;
  label: string;
  value: string;
  withDivider?: boolean;
};

function MediaFactRow({
  icon,
  label,
  value,
  withDivider = true,
}: MediaFactRowProps) {
  return (
    <Box>
      <Box
        sx={{
          alignItems: { xs: "flex-start", sm: "center" },
          display: "grid",
          gap: 2,
          gridTemplateColumns: "24px minmax(100px, 0.8fr) minmax(0, 1.2fr)",
          py: 2.25,
        }}
      >
        <Box
          aria-hidden="true"
          sx={{ color: "secondary.main", display: "flex" }}
        >
          {icon}
        </Box>
        <Typography color="text.secondary" variant="body2">
          {label}
        </Typography>
        <Typography
          sx={{ fontWeight: 600, overflowWrap: "anywhere" }}
          variant="body2"
        >
          {value}
        </Typography>
      </Box>
      {withDivider ? <Divider /> : null}
    </Box>
  );
}
