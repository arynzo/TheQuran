import {
  Box,
  AppBar,
  Toolbar,
  Container,
  Paper,
  Skeleton,
} from "@mui/material";

const SurahViewSkeleton = () => {
  // Array to render a predictable amount of placeholder items (e.g., 4 verses)
  const skeletonVerses = Array.from(new Array(4));

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
        pb: 4,
      }}
    >
      {/* AppBar Skeleton */}
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
          {/* Back Button Skeleton */}
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            sx={{ bgcolor: "rgba(255,255,255,0.15)" }}
          />

          {/* Surah Name English Skeleton */}
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Skeleton
              variant="text"
              width={120}
              height={32}
              sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
            />
          </Box>

          {/* Surah Name Arabic Skeleton */}
          <Skeleton
            variant="text"
            width={90}
            height={38}
            sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
          />
        </Toolbar>
      </AppBar>

      {/* Main Container Skeleton */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          {skeletonVerses.map((_, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3.5 },
                pt: { xs: 4, sm: 4.5 },
                borderRadius: "16px",
                border: "1px solid",
                borderColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(0, 0, 0, 0.06)",
                backgroundColor: "background.paper",
              }}
            >
              {/* Row: Verse Badge & Arabic Text Placeholder */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 2,
                  mb: 3,
                }}
              >
                {/* Badge Placeholder */}
                <Skeleton
                  variant="rounded"
                  width={32}
                  height={24}
                  sx={{ borderRadius: "8px", flexShrink: 0 }}
                />

                {/* Ayat Text Placeholder (Simulating right-aligned dynamic multi-line Arabic text) */}
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 1,
                  }}
                >
                  <Skeleton variant="text" width="90%" height={32} />
                  <Skeleton variant="text" width="65%" height={32} />
                </Box>
              </Box>

              {/* Translation Layout Placeholder with Left Border */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  borderLeft: "3px solid",
                  borderColor: "primary.main",
                  pl: 2,
                  py: 0.5,
                }}
              >
                {/* English Translation Text Line Placeholders */}
                <Skeleton variant="text" width="95%" height={20} />
                <Skeleton variant="text" width="80%" height={20} />
              </Box>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default SurahViewSkeleton;
