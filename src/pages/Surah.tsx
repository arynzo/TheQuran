import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
  Paper,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SurahViewSkeleton from "../components/SurahSkeleton";
import AlertPopup from "../components/Alert";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useGlobalContext } from "../context/context";
import type { TranslationType } from "../data/lang/tn/type";
import type { meanType } from "../data/lang/mn/type";
import info, { type surahInfoType } from "../data/surahInfo/all";
import { motion, AnimatePresence, type Variants } from "framer-motion";

// Parent animation wrapper type config
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04, // Har ayat ke beech ka smooth gap
    },
  },
};

export default function Surah() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const { textSettings, handleBookmarkSave } = useGlobalContext();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const [surahInfo, setSurahInfo] = useState<null | surahInfoType>(
    info[Number(id) - 1],
  );
  const [ayat, setAyat] = useState<null | TranslationType[]>(null);
  const [mean, setMean] = useState<null | meanType[]>(null);

  function isArabic() {
    return textSettings.ayatTranslation === "ar";
  }

  useEffect(() => {
    if (!id) navigate("/");

    (async () => {
      try {
        setSurahInfo(info[Number(id) - 1]);
        // Import ayat
        const tn = await import(
          `../data/lang/tn/${textSettings.ayatTranslation}.ts`
        );
        setAyat(tn.default[Number(id) - 1]);

        // Import mean
        if (textSettings.secondTranslation !== "db") {
          const mn = await import(
            `../data/lang/mn/${textSettings.secondTranslation}.ts`
          );
          setMean(mn.default[Number(id) - 1]);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error in file load", error);
      }
    })();
  }, [
    textSettings.ayatTranslation,
    textSettings.secondTranslation,
    navigate,
    id,
  ]); // surahInfo dependency yahan se hata di crash/loop se bachne ke liye

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const ayatId = searchParams.get("ayat");
    if (!ayatId) return;

    const element = document.getElementById(ayatId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [searchParams, ayat, mean]);

  if (isLoading) {
    return <SurahViewSkeleton />;
  }

  return (
    <>
      <AlertPopup
        message="Bookmark saved successfully!"
        duration={2000}
        horizontal="center"
        vertical="top"
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        severity="success"
        variant="standard"
      />
      <Box
        sx={{
          bgcolor: "background.default",
          minHeight: "100vh",
          pb: 4,
          transition: "background-color 0.3s ease",
        }}
      >
        {/* AppBar */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            backgroundColor: "primary.main",
            borderBottom: "1.5px solid",
            borderColor: "divider",
          }}
        >
          <Toolbar
            sx={{ display: "flex", justifyContent: "space-between", px: 2 }}
          >
            {/* Back Button */}
            <IconButton
              onClick={() => navigate("/")}
              edge="start"
              sx={{ color: "white" }}
            >
              <ArrowBackIcon />
            </IconButton>

            {/* Surah Name English */}
            <Typography
              variant="h6"
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.5px",
                color: "white",
              }}
            >
              {surahInfo?.name}
            </Typography>

            {/* Surah Name Arabic */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontFamily: "Roboto, serif",
                color: "white",
              }}
            >
              {surahInfo?.arabic}
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Main Container */}
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Box
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
          >
            <AnimatePresence mode="popLayout">
              {ayat?.map((verse, index) => {
                // Pehle ke 5 cards (index 0 to 4) smoothly stagger animate honge
                // Baaki sab bina delay ke instant visibility hold karenge
                const dynamicVerseVariants: Variants = {
                  hidden:
                    index < 5 ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.25, ease: "easeOut" },
                  },
                  exit: { opacity: 0, transition: { duration: 0.15 } },
                };

                return (
                  <motion.div
                    key={verse.id}
                    variants={dynamicVerseVariants}
                    style={{ pointerEvents: "auto" }}
                  >
                    <Paper
                      id={String(verse.id + 1)}
                      onClick={() => {
                        if (textSettings?.bookmark !== `${id}:${verse.id}`) {
                          handleBookmarkSave(`${id}:${verse.id}`);
                          setShowAlert(true);
                        } else {
                          handleBookmarkSave("");
                        }
                      }}
                      elevation={theme.palette.mode === "dark" ? 1 : 0}
                      sx={{
                        p: { xs: 3, sm: 3.5 },
                        borderRadius: "16px",
                        border: "1px solid",
                        cursor: "pointer",
                        position: "relative",
                        borderColor: () => {
                          if (
                            Number(textSettings?.bookmark?.split(":")[1]) ===
                            verse.id
                          ) {
                            return "#3b8a52";
                          } else {
                            return theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.08)"
                              : "rgba(0, 0, 0, 0.06)";
                          }
                        },
                        backgroundColor: "background.paper",
                        transition:
                          "border-color 0.2s ease, box-shadow 0.2s ease",
                        "&:hover": {
                          boxShadow:
                            theme.palette.mode === "dark"
                              ? "0 4px 20px rgba(0, 0, 0, 0.4)"
                              : "0 4px 20px rgba(0, 0, 0, 0.03)",
                        },
                      }}
                    >
                      {/* Row: Verse Badge & Arabic Text (Anti-Overlap) */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: isArabic() ? "flex-start" : "baseline",
                          flexDirection: isArabic() ? "row" : "row-reverse",
                          gap: 1,
                          mb: textSettings.secondTranslation === "db" ? 0 : 3,
                        }}
                      >
                        {/* Verse Badge */}
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 700,
                            color:
                              theme.palette.mode === "dark"
                                ? "white"
                                : "primary.main",
                            backgroundColor:
                              theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.06)"
                                : "rgba(0, 0, 0, 0.04)",
                            px: 1.2,
                            py: 0.6,
                            borderRadius: "8px",
                            minWidth: "24px",
                            textAlign: "start",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "11px",
                            flexShrink: 0,
                          }}
                        >
                          {verse.id}
                        </Typography>

                        {/* Ayat Text */}
                        <Typography
                          component="h2"
                          sx={{
                            color: () =>
                              Number(textSettings?.bookmark?.split(":")[1]) ===
                              verse.id
                                ? "#3b8a52"
                                : "text.primary",
                            fontFamily: isArabic()
                              ? `${textSettings.ayatFont}, sans-serif, Arial`
                              : "inter, Roboto, Arial",
                            fontSize: `${textSettings?.ayatSize || "26"}px`,
                            fontWeight: isArabic() ? 400 : 500,
                            textDirection: "rtl",
                            lineHeight: isArabic() ? 2.5 : 1.6,
                            flexGrow: 1,
                            textAlign: isArabic() ? "right" : "left",
                          }}
                        >
                          {verse.text}
                        </Typography>
                      </Box>

                      {/* Translation Layout with Left Border */}
                      {!textSettings.secondTranslation.includes("db") && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 2,
                            borderLeft: "3px solid",
                            borderColor: "primary.main",
                            pl: 2,
                            py: 0.5,
                          }}
                        >
                          {/* English/Secondary Translation Text */}
                          <Typography
                            variant="body1"
                            sx={{
                              fontSize: `${textSettings.translationSize}px`,
                              fontFamily: "'inter', sans-serif",
                              color: "text.secondary",
                              lineHeight: 1.6,
                              fontWeight: 450,
                            }}
                          >
                            {mean ? mean[index]?.text : ""}
                          </Typography>
                        </Box>
                      )}
                    </Paper>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </Box>
        </Container>
      </Box>
    </>
  );
}
