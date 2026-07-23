import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./core/themes/theme.ts";
import { WatchListProvider } from "./features/watchlist/providers/WatchListProvider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WatchListProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </WatchListProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
