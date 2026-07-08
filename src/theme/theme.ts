import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const baseTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fbc500",
      light: "#ffd84d",
      dark: "#c79500",
      contrastText: "#050b14",
    },
    secondary: {
      main: "#00b8a9",
      light: "#4de2d6",
      dark: "#00877c",
      contrastText: "#050b14",
    },
    background: {
      default: "#101010",
      paper: "#181818",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: ["Inter", "Roboto", "Arial", "sans-serif"].join(","),
  },
});

export const theme = responsiveFontSizes(baseTheme);
