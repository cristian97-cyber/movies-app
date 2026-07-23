import "./App.css";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import { Header } from "./layout/Header.tsx";
import { HomePage } from "./features/media/pages/HomePage";
import { MediaDetailPage } from "./features/media/pages/MediaDetailPage.tsx";
import { APP_URL } from "./core/const/app-url.const.ts";

function App() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header />
      <Box component="main">
        <Routes>
          <Route index element={<HomePage />} />
          <Route
            path={`${APP_URL.Media}/:mediaType/:id`}
            element={<MediaDetailPage />}
          />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
