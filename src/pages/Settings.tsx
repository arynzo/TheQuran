import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Button,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import AlertPopup from "../components/Alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/context";
import { getCurrentLangText } from "../utils/helpers";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { Settings } from "../context/type";

export default function Settings() {
  // Importing Context Properties
  const { textSettings, handleSettingChange } = useGlobalContext();

  // States for form fields (with fallback to 'Amiri' as default if not present)
  const [settings, setSettings] = useState<Settings>({
    ayatTranslation: textSettings?.ayatTranslation,
    secondTranslation: textSettings?.secondTranslation,
    ayatSize: textSettings?.ayatSize,
    translationSize: textSettings?.translationSize,
    ayatFont: textSettings?.ayatFont,
    bookmark: textSettings?.bookmark,
  });

  // UI Feedback States
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // 300ms loading timeout
    setTimeout(() => {
      handleSettingChange(settings);
      setIsLoading(false);
      setShowAlert(true);
    }, 300);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent,
  ) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAyatSizeChange =
    (field: "ayatSize" | "translationSize") =>
    (_: Event, value: number | number[]) => {
      setSettings((prev) => ({
        ...prev,
        [field]: value as number,
      }));
    };

  // Select Styles Customization
  const selectCustomStyles = {
    color: "text.primary",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "divider",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "text.secondary",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "text.primary",
      borderWidth: "1px",
    },
  };

  const labelCustomStyles = {
    color: "text.secondary",
    "&.Mui-focused": {
      color: "text.primary",
    },
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pb: 4 }}>
      {/* Top App Bar */}

      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "primary.main",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={() => {
              navigate("/");
            }}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center", fontWeight: 600, mr: 5 }}
          >
            Settings
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Form Content */}
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper
          elevation={0}
          variant="outlined"
          component="form"
          onSubmit={handleSave}
          sx={{ p: 3, borderRadius: 2, bgcolor: "background.paper" }}
        >
          <Stack spacing={4}>
            {/* Ayat Translation Select */}
            <FormControl fullWidth variant="outlined">
              <InputLabel id="ayat-translation-label" sx={labelCustomStyles}>
                Ayat Transliterations
              </InputLabel>
              <Select
                name="ayatTranslation"
                labelId="ayat-translation-label"
                id="ayat-translation"
                value={settings.ayatTranslation}
                label="Ayat Transliterations"
                onChange={handleChange}
                sx={selectCustomStyles}
              >
                <MenuItem value="ar">Arabic</MenuItem>
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="bn">Bengali</MenuItem>
              </Select>
            </FormControl>

            {/* Second Translation Select */}
            <FormControl fullWidth variant="outlined">
              <InputLabel id="second-translation-label" sx={labelCustomStyles}>
                Second Translation
              </InputLabel>
              <Select
                name="secondTranslation"
                labelId="second-translation-label"
                id="second-translation"
                value={settings.secondTranslation}
                label="Second Translation"
                onChange={handleChange}
                sx={selectCustomStyles}
              >
                <MenuItem value="db">Disable</MenuItem>
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="bn">Bengali</MenuItem>
                <MenuItem value="hl">Hinglish</MenuItem>
                <MenuItem value="hn">Hindi</MenuItem>
              </Select>
            </FormControl>

            {/* Ayat Text Size Slider */}
            <Box>
              <Typography
                id="ayat-size-slider"
                gutterBottom
                sx={{ fontWeight: 500, color: "text.secondary" }}
              >
                Ayat Text Size ({settings.ayatSize}px)
              </Typography>
              <Slider
                name="ayatSize"
                value={Number(settings.ayatSize)}
                onChange={handleAyatSizeChange("ayatSize")}
                min={16}
                max={48}
                step={2}
                valueLabelDisplay="auto"
                aria-labelledby="ayat-size-slider"
                sx={{
                  color: "text.primary",
                }}
              />
            </Box>

            {/* Translation Text Size Slider */}
            <Box>
              <Typography
                id="translation-size-slider"
                gutterBottom
                sx={{ fontWeight: 500, color: "text.secondary" }}
              >
                Translation Text Size ({settings.translationSize}px)
              </Typography>
              <Slider
                name="translationSize"
                value={Number(settings.translationSize)}
                onChange={handleAyatSizeChange("translationSize")}
                min={12}
                max={32}
                step={1}
                valueLabelDisplay="auto"
                aria-labelledby="translation-size-slider"
                sx={{
                  color: "text.primary",
                }}
              />
            </Box>
            {/* Arabic Font Style Select */}
            {settings.ayatTranslation.includes("ar") && (
              <FormControl fullWidth variant="outlined">
                <InputLabel id="arabic-font-label" sx={labelCustomStyles}>
                  Arabic Font Style
                </InputLabel>
                <Select
                  name="ayatFont"
                  labelId="arabic-font-label"
                  id="arabic-font-select"
                  value={settings.ayatFont}
                  label="Arabic Font Style"
                  onChange={handleChange}
                  sx={selectCustomStyles}
                >
                  <MenuItem value="Amiri" sx={{ fontFamily: "Amiri, serif" }}>
                    Amiri
                  </MenuItem>
                  <MenuItem
                    value="noorehuda"
                    sx={{ fontFamily: "noorehuda, serif" }}
                  >
                    Noorehuda
                  </MenuItem>
                  <MenuItem
                    value="Noto Naskh Arabic"
                    sx={{ fontFamily: "Noto Naskh Arabic, serif" }}
                  >
                    Noto Naskh Arabic
                  </MenuItem>
                  <MenuItem
                    value="Aref Ruqaa"
                    sx={{ fontFamily: "Aref Ruqaa, serif" }}
                  >
                    Aref Ruqaa
                  </MenuItem>
                </Select>
              </FormControl>
            )}

            {/* --- LIVE PREVIEW SECTION --- */}
            <Divider sx={{ my: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  px: 1,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Preview
              </Typography>
            </Divider>

            <Paper
              variant="outlined"
              sx={{
                p: 2.5,
                borderRadius: 1.5,
                bgcolor: "background.default",
                borderStyle: "dashed",
                borderColor: "divider",
              }}
            >
              <Stack spacing={2}>
                {/* Arabic Ayat Preview - Dynamic FontFamily Applied */}
                <Typography
                  dir="rtl"
                  sx={{
                    fontSize: `${settings.ayatSize}px`,
                    fontFamily: () => {
                      if (settings.ayatTranslation == "ar") {
                        return `${settings.ayatFont}, sans-serif, Arial`;
                      } else {
                        return "inter, Roboto, Arial";
                      }
                    },

                    lineHeight: 1.6,
                    color: "text.primary",
                    textAlign:
                      settings.ayatTranslation == "ar" ? "right" : "left",
                  }}
                >
                  {getCurrentLangText(settings.ayatTranslation, "verse")}
                </Typography>

                {/* English Translation Preview */}
                {!settings.secondTranslation.includes("db") && (
                  <Typography
                    sx={{
                      fontFamily: "inter, sans-serif, arial",
                      fontSize: `${settings.translationSize}px`,
                      lineHeight: 1.5,
                      color: "text.secondary",
                      textAlign: "left",
                    }}
                  >
                    {getCurrentLangText(settings.secondTranslation, "meaning")}
                  </Typography>
                )}
              </Stack>
            </Paper>
            {/* --- END OF PREVIEW SECTION --- */}

            {/* Save Button with Loading State */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              loading={isLoading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: 1.5,
                fontWeight: "bold",
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                },
              }}
            >
              Save Settings
            </Button>
          </Stack>
        </Paper>
      </Container>

      {/* Success Alert Snackbar */}
      <AlertPopup
        message="Changes saved successfully!"
        duration={2000}
        horizontal="center"
        vertical="bottom"
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        severity="success"
        variant="standard"
      />
    </Box>
  );
}
