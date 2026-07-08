import "./App.css";
import { Box } from "@mui/material";

import { Header } from "./components/Header";

function App() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header />
      <Box component="main" sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 4 }}>
        App
      </Box>
    </Box>
  );
}

export default App;
