import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useGlobalContext } from "./context/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Surah from "./pages/Surah";
import Settings from "./pages/Settings";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const { AppTheme } = useGlobalContext();

  const theme = createTheme({
    palette: {
      mode: AppTheme,
      primary: {
        main: "#1e4729",
      },
    },
    // Disabling Automatic Color Mixer Overide
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/surah/:id" element={<Surah />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
