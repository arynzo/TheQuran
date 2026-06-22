import {
  Box,
  Card,
  CardActionArea,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import surahs_info from "../data/surahInfo/all.ts";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

// TypeScript Variants type explicitly apply kiya error fix karne ke liye
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export default function SurahList() {
  const navigator = useNavigate();
  const [surahs, setSurahs] = useState(surahs_info);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;

    if (!Number(search)) {
      const filterData = surahs_info.filter((data) =>
        data.name.toLowerCase().includes(search.toLowerCase()),
      );
      setSurahs(filterData);
    } else {
      const filterData = surahs_info.filter(
        (data) => data.id === Number(search),
      );
      setSurahs(filterData);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <SearchBar onChange={handleSearch} />
      <Divider sx={{ mt: 3 }} variant="middle">
        <Typography variant="h6" sx={{ fontStyle: "italic" }}>
          Surah's
        </Typography>
      </Divider>

      <Box
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 1.5 }}
      >
        <AnimatePresence mode="popLayout">
          {surahs.map((surah, index) => {
            // Dynamic Variants: Agar index < 10 hai toh animate hoga, varna instantly show hoga
            const dynamicCardVariants: Variants = {
              hidden: index < 10 ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.2, ease: "easeOut" },
              },
              exit: { opacity: 0, transition: { duration: 0.1 } },
            };

            return (
              <motion.div
                key={surah.id}
                variants={dynamicCardVariants}
                style={{ pointerEvents: "auto" }}
              >
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    transition: "border-color 0.2s ease",
                    "&:hover": {
                      borderColor: "primary.main",
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => navigator(`/surah/${surah.id}`)}
                    sx={{ px: 2, py: 2 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                      }}
                    >
                      {/* LEFT SIDE */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          flex: 1,
                          minWidth: 0,
                        }}
                      >
                        {/* NUMBER BOX */}
                        <Box
                          sx={{
                            width: 42,
                            height: 42,
                            borderRadius: 3,
                            bgcolor: "primary.main",
                            color: "primary.contrastText",
                            border: "1.5px solid",
                            borderColor: "divider",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: 15,
                            flexShrink: 0,
                          }}
                        >
                          <Typography sx={{ fontWeight: 600 }}>
                            {surah.id}
                          </Typography>
                        </Box>

                        {/* NAME INFO */}
                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            noWrap
                            sx={{
                              fontFamily: "inter, sans-serif",
                              fontSize: 16,
                              fontWeight: 650,
                            }}
                          >
                            {surah.name}
                          </Typography>
                          <Typography
                            noWrap
                            variant="body2"
                            color="textSecondary"
                            sx={{ fontFamily: "inter, sans-serif" }}
                          >
                            {surah.meaning}
                          </Typography>
                        </Box>
                      </Box>

                      {/* RIGHT SIDE */}
                      <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                        <Typography
                          sx={{
                            fontSize: 20,
                            fontWeight: 600,
                            lineHeight: 1.2,
                          }}
                        >
                          {surah.arabic}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{
                            fontFamily: "inter, sans-serif",
                            fontSize: "14px",
                            mt: 0.2,
                          }}
                        >
                          {surah.total_ayats} ayats
                        </Typography>
                      </Box>
                    </Box>
                  </CardActionArea>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </Box>
    </Container>
  );
}
