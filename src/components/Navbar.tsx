import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LightModeSharpIcon from "@mui/icons-material/LightModeSharp";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import TranslateSharpIcon from "@mui/icons-material/TranslateSharp";
import { useGlobalContext } from "../context/context";
import { useNavigate } from "react-router-dom";

type Props = {
  title?: string;
};

export default function Navbar({ title = "The Quran" }: Props) {
  const { AppTheme, toggleTheme } = useGlobalContext();
  const navigator = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          height: {
            xs: "56px",
            sm: "64px",
          },
        }}
      ></Box>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "primary.main",
          borderBottom: "1.5px solid",
          borderBottomColor: "divider",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          {/* TITLE */}
          <Typography
            noWrap
            component="h1"
            onClick={() => {
              navigator("/");
            }}
            sx={{
              fontWeight: 700,
              flexShrink: 0,
              fontFamily: "Playfair Display",
              fontSize: "24px",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {title}
          </Typography>

          {/* RIGHT SIDE */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: {
                xs: 0.5,
                sm: 1.5,
              },
              minWidth: 0,
            }}
          >
            {/* THEME ICON */}
            <IconButton
              color="inherit"
              onClick={toggleTheme}
              sx={{
                flexShrink: 0,
              }}
            >
              {AppTheme == "dark" ? <LightModeSharpIcon /> : <DarkModeIcon />}
            </IconButton>

            {/* LANGUAGE ICON */}
            <IconButton
              color="inherit"
              onClick={() => {
                navigator("/settings");
              }}
              sx={{
                flexShrink: 0,
              }}
            >
              <TranslateSharpIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
