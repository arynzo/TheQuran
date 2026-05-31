import {
  Box,
  Card,
  CardActionArea,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import surahs_info from "../data/surahInfo/all.ts";
import SearchBar from "./SearchBar";
import { useState } from "react";

export default function SurahList() {
  const navigator: (path: string) => void = useNavigate();
  const [surahs, setSurahs] = useState(surahs_info);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search: string | number = e.target.value;

    if (!Number(search)) {
      const filterData = surahs_info.filter((data) =>
        data.name.toLowerCase().includes(search.toLowerCase()),
      );
      setSurahs(filterData);
      console.log(filterData);
    } else {
      const filterData = surahs_info.filter(
        (data) => data.id == Number(search),
      );
      setSurahs(filterData);
      console.log(filterData);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        py: 3,
      }}
    >
      <SearchBar onChange={handleSearch} />
      <Divider sx={{ mt: 3 }} variant="middle">
        <Typography
          variant="h6"
          sx={{
            fontStyle: "italic",
          }}
        >
          Surah's
        </Typography>
      </Divider>
      <Stack
        sx={{
          mt: 3,
          gap: 1.5,
        }}
      >
        {surahs.map((surah) => (
          <Card
            key={surah.id}
            elevation={0}
            sx={{
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",

              transition: "0.2s ease",

              "&:hover": {
                borderColor: "primary.main",
                transform: "translateY(-2px)",
              },
            }}
          >
            <CardActionArea
              onClick={() => {
                navigator(`/surah/${surah.id}`);
              }}
              sx={{
                px: 2,
                py: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                {/* LEFT */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,

                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  {/* NUMBER */}
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
                    <Typography
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      {surah.id}
                    </Typography>
                  </Box>

                  {/* NAME */}
                  <Box
                    sx={{
                      minWidth: 0,
                    }}
                  >
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
                      sx={{
                        fontFamily: "inter, sans-serif",
                      }}
                      variant="body2"
                      color="textSecondary"
                    >
                      {surah.meaning}
                    </Typography>
                  </Box>
                </Box>

                {/* RIGHT */}
                <Box
                  sx={{
                    textAlign: "right",
                    flexShrink: 0,
                  }}
                >
                  <Typography
                    sx={{
                      // fontFamily: "arial",
                      fontSize: 20,
                      fontWeight: 600,
                      lineHeight: 1.2,
                      // mb: 0.5,
                    }}
                  >
                    {surah.arabic}
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: "inter, sans-serif",
                      fontSize: "14px",
                      mt: 0.2,
                    }}
                    variant="body2"
                    color="textSecondary"
                  >
                    {surah.total_ayats} ayats
                  </Typography>
                </Box>
              </Box>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
