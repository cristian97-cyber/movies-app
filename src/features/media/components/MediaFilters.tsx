import LocalMoviesOutlinedIcon from "@mui/icons-material/LocalMoviesOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { type MouseEvent } from "react";
import type { TmdbGenreModel } from "../../../apis/tmdb/models/tmdb-genre.model.ts";
import type { TmdbMediaType } from "../../../apis/tmdb/types/tmdb-media.type.ts";
import type { TmdbSortByType } from "../../../apis/tmdb/types/tmdb-sort-by.type.ts";

type MoviesFiltersProps = {
  mediaType: TmdbMediaType;
  genre: string;
  sortBy: TmdbSortByType;
  genres: TmdbGenreModel[];
  totalResults: number;
  handleMediaTypeChange: (mediaType: TmdbMediaType) => void;
  handleGenreChange: (genre: string) => void;
  handleSortByChange: (sortBy: TmdbSortByType) => void;
};

const DEFAULT_MEDIA_TYPE: TmdbMediaType = "movie";
const DEFAULT_GENRE = "";
const DEFAULT_SORT_BY: TmdbSortByType = "popularity.desc";

export function MediaFilters({
  mediaType,
  genre,
  sortBy,
  genres,
  totalResults,
  handleMediaTypeChange,
  handleGenreChange,
  handleSortByChange,
}: MoviesFiltersProps) {
  const hasActiveFilters =
    mediaType !== DEFAULT_MEDIA_TYPE ||
    genre !== DEFAULT_GENRE ||
    sortBy !== DEFAULT_SORT_BY;

  const onMediaTypeChange = (
    _event: MouseEvent<HTMLElement>,
    nextMediaType: TmdbMediaType | null,
  ) => {
    if (nextMediaType && nextMediaType !== mediaType) {
      handleMediaTypeChange(nextMediaType);
    }
  };

  const onGenreChange = (genre: string) => {
    handleGenreChange(genre);
  };

  const handleReset = () => {
    handleMediaTypeChange(DEFAULT_MEDIA_TYPE);
    handleGenreChange(DEFAULT_GENRE);
    handleSortByChange(DEFAULT_SORT_BY);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box
        sx={{
          alignItems: { xs: "flex-start", sm: "flex-end" },
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 1, sm: 3 },
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography component="h2" variant="h4" sx={{ mb: 1 }}>
            Scopri film e serie TV
          </Typography>
          <Typography color="text.secondary" variant="body1">
            Esplora i titoli selezionati dal catalogo TMDB.
          </Typography>
        </Box>

        {totalResults > 0 && (
          <Typography
            aria-live="polite"
            color="text.secondary"
            sx={{ flexShrink: 0 }}
            variant="body2"
          >
            {totalResults.toLocaleString("it-IT")} risultati
          </Typography>
        )}
      </Box>

      <Box
        aria-label="Filtri e ordinamento del catalogo"
        component="section"
        sx={{
          alignItems: "end",
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            sm: "repeat(2, minmax(0, 1fr))",
            md: "minmax(220px, 1.25fr) minmax(170px, 1fr) minmax(170px, 1fr) auto",
          },
        }}
      >
        <ToggleButtonGroup
          aria-labelledby="media-type-label"
          exclusive
          fullWidth
          onChange={onMediaTypeChange}
          value={mediaType}
          sx={{
            gap: 1,
            "& .MuiToggleButtonGroup-grouped": {
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              gap: 1,
              minHeight: 56,
              "&.Mui-selected": {
                bgcolor: "primary.main",
                color: "primary.contrastText",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              },
            },
          }}
        >
          <ToggleButton value="movie">
            <LocalMoviesOutlinedIcon fontSize="small" />
            Film
          </ToggleButton>
          <ToggleButton value="tv">
            <LiveTvOutlinedIcon fontSize="small" />
            Serie TV
          </ToggleButton>
        </ToggleButtonGroup>

        <FormControl fullWidth>
          <InputLabel id="genre-filter-label">Genere</InputLabel>
          <Select
            label="Genere"
            labelId="genre-filter-label"
            onChange={(event) => onGenreChange(event.target.value)}
            value={genre}
          >
            <MenuItem value={""}>Tutti i generi</MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="sort-filter-label">Ordina per</InputLabel>
          <Select
            label="Ordina per"
            labelId="sort-filter-label"
            onChange={(event) => handleSortByChange(event.target.value)}
            value={sortBy}
          >
            <MenuItem value="popularity.desc">Popolarità</MenuItem>
            <MenuItem value="vote_average.desc">Rating</MenuItem>
            <MenuItem
              value={
                mediaType === "movie"
                  ? "primary_release_date.desc"
                  : "first_air_date.desc"
              }
            >
              Data di uscita
            </MenuItem>
          </Select>
        </FormControl>

        <Button
          disabled={!hasActiveFilters}
          onClick={handleReset}
          startIcon={<RestartAltIcon />}
          sx={{
            gridColumn: { xs: "auto", sm: "1 / -1", md: "auto" },
            justifySelf: "start",
            minHeight: 56,
            whiteSpace: "nowrap",
          }}
          variant="text"
        >
          Reimposta
        </Button>
      </Box>
    </Box>
  );
}
