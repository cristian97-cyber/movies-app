import "./App.css";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { MovieDetailPage } from "./pages/MovieDetailPage";
import { APP_URL } from "./const/app-url.const.ts";

function App() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header />
      <Box component="main" sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 4 }}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route
            path={`${APP_URL.Movies}/:movieId`}
            element={<MovieDetailPage />}
          />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
