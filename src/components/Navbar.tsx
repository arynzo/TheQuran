import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LightModeSharpIcon from "@mui/icons-material/LightModeSharp";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import TranslateSharpIcon from "@mui/icons-material/TranslateSharp";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useGlobalContext } from "../context/context";
import { useNavigate } from "react-router-dom";

type Props = {
  title?: string;
};

export default function Navbar({ title = "The Quran" }: Props) {
  const { AppTheme, toggleTheme, textSettings } = useGlobalContext();
  const navigator = useNavigate();

  const gotoBookmark = (work: "navigate" | "isSaved") => {
    if (work == "navigate") {
      const [id, ayatid] = textSettings.bookmark.split(":");
      navigator(`/surah/${id}?ayat=${ayatid}`);
    } else {
      return textSettings.bookmark;
    }
  };

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
            {gotoBookmark("isSaved") && (
              <Tooltip title="Bookmark" arrow>
                <IconButton
                  color="inherit"
                  onClick={() => {
                    gotoBookmark("navigate");
                  }}
                  sx={{
                    flexShrink: 0,
                  }}
                >
                  <BookmarkIcon />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="ChangeTheme" arrow>
              <IconButton
                color="inherit"
                onClick={toggleTheme}
                sx={{
                  flexShrink: 0,
                }}
              >
                {AppTheme == "dark" ? <LightModeSharpIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>

            {/* LANGUAGE ICON */}
            <Tooltip title="Setting" arrow>
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
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
