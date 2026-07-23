import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { type SubmitEventHandler, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { APP_URL } from "../core/const/app-url.const.ts";
import { MediaSearchDialog } from "../features/media/components/MediaSearchDialog.tsx";
import { WatchList } from "../features/watchlist/components/WatchList.tsx";
import { useWatchList } from "../features/watchlist/hooks/useWatchList.ts";

export function Header() {
  const { items: watchList } = useWatchList();

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isWatchListOpen, setIsWatchListOpen] = useState(false);

  const handleSearchSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setSearchQuery(searchInput.trim());
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          background:
            "linear-gradient(90deg, rgba(0, 184, 169, 0.08), rgba(16, 16, 16, 0.98) 32%)",
          backdropFilter: "blur(16px)",
        }}
      >
        <Toolbar
          component="header"
          sx={{
            alignItems: "center",
            flexWrap: { xs: "wrap", sm: "nowrap" },
            gap: { xs: 2, md: 4 },
            minHeight: { xs: 88, md: 104 },
            px: { xs: 2, sm: 4, md: 6 },
            py: { xs: 2, md: 2.5 },
          }}
        >
          <Box
            aria-label="Vai alla home di CineScope"
            component={RouterLink}
            to={APP_URL.Index}
            sx={{
              alignItems: "center",
              color: "inherit",
              display: "flex",
              flexShrink: 0,
              gap: { xs: 1.5, md: 2 },
              minWidth: { sm: 340 },
              textDecoration: "none",
              "&:focus-visible": {
                borderRadius: 2,
                outline: "3px solid",
                outlineColor: "primary.main",
                outlineOffset: 4,
              },
            }}
          >
            <Box
              component="img"
              src="/favicon.png"
              alt="CineScope"
              sx={{
                borderRadius: 2,
                flexShrink: 0,
                height: { xs: 56, md: 72 },
                width: { xs: 56, md: 72 },
              }}
            />

            <Box sx={{ minWidth: 0 }}>
              <Typography
                component="p"
                sx={{
                  color: "common.white",
                  fontSize: { xs: "1.45rem", md: "1.75rem" },
                  fontWeight: 800,
                  letterSpacing: 0,
                  lineHeight: 1.05,
                }}
              >
                CineScope
              </Typography>
              <Typography
                component="p"
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  fontWeight: 600,
                  lineHeight: 1.4,
                  mt: 0.5,
                }}
              >
                Film, serie tv e scelte salvate
              </Typography>
            </Box>
          </Box>

          <Box
            component="form"
            onSubmit={handleSearchSubmit}
            role="search"
            sx={{
              flexBasis: { xs: "100%", sm: "auto" },
              maxWidth: { sm: 520, md: 760 },
              ml: { xs: 0, sm: "auto" },
              order: { xs: 3, sm: 2 },
              width: "100%",
            }}
          >
            <TextField
              fullWidth
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Cerca un titolo"
              slotProps={{
                htmlInput: {
                  "aria-label": "Cerca un titolo",
                },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(16, 16, 20, 0.82)",
                  borderRadius: 2,
                  fontSize: { xs: "1rem", md: "1.15rem" },
                  height: { xs: 48, md: 56 },
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.16)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.28)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "text.secondary",
                  opacity: 1,
                },
              }}
              value={searchInput}
            />
          </Box>

          <Tooltip title="Apri la watchlist">
            <IconButton
              aria-label="Apri la watchlist, 12 titoli"
              onClick={() => setIsWatchListOpen(true)}
              sx={{
                border: "1px solid rgba(255, 255, 255, 0.16)",
                flexShrink: 0,
                ml: { xs: "auto", sm: 0 },
                order: { xs: 2, sm: 3 },
                "&:hover": {
                  bgcolor: "rgba(251, 197, 0, 0.08)",
                  borderColor: "primary.main",
                },
              }}
            >
              <Badge badgeContent={watchList.length} color="primary" max={99}>
                <BookmarkBorderIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <MediaSearchDialog
        onClose={() => setSearchQuery("")}
        searchQuery={searchQuery}
      />
      <WatchList
        open={isWatchListOpen}
        onClose={() => setIsWatchListOpen(false)}
      />
    </>
  );
}
