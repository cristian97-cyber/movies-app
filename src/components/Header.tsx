import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Box,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

export function Header() {
  return (
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
          sx={{
            alignItems: "center",
            display: "flex",
            flexShrink: 0,
            gap: { xs: 1.5, md: 2 },
            minWidth: { sm: 340 },
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
              Movies, shows, and saved picks
            </Typography>
          </Box>
        </Box>

        <TextField
          fullWidth
          placeholder="Search title"
          slotProps={{
            htmlInput: {
              "aria-label": "Search title",
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
            flexBasis: { xs: "100%", sm: "auto" },
            maxWidth: { sm: 520, md: 760 },
            ml: { sm: "auto" },
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
        />
      </Toolbar>
    </AppBar>
  );
}
