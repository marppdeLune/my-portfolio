import ExploreIcon from "@mui/icons-material/Explore";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import type { Section } from "../data/sections";
import type { ColorMode } from "../theme";
import { SectionDialog } from "./section-dialog";

type UIOverlayProps = {
  colorMode: ColorMode;
  isMoving: boolean;
  section: Section | null | undefined;
  onToggleColorMode: () => void;
  onCloseSection: () => void;
};

export const UIOverlay = ({
  colorMode,
  isMoving,
  section,
  onToggleColorMode,
  onCloseSection,
}: UIOverlayProps) => {
  const isDark = colorMode === "dark";

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          position: "absolute",
          top: { xs: 16, sm: 24 },
          left: { xs: 16, sm: 24 },
          right: { xs: 16, sm: 24 },
          alignItems: { xs: "flex-start", sm: "flex-start" },
          justifyContent: "space-between",
        }}
      >
        <Stack spacing={0.8}>
          <Typography
            variant="overline"
            color="primary.main"
            sx={{ fontWeight: 900, letterSpacing: "0.12em" }}
          >
            Full-stack Software Engineer
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: 42, sm: 72 },
              lineHeight: 0.9,
              textShadow: "0 18px 60px rgba(0, 0, 0, 0.45)",
            }}
          >
            Martin Pham
          </Typography>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.2}
          sx={{
            pointerEvents: "auto",
            alignSelf: { xs: "stretch", sm: "flex-start" },
          }}
        >
          <Button
            variant="contained"
            color={isDark ? "secondary" : "primary"}
            startIcon={isDark ? <LightModeIcon /> : <DarkModeIcon />}
            onClick={onToggleColorMode}
            sx={{
              justifyContent: "flex-start",
              minHeight: 44,
              borderRadius: 2,
              bgcolor: isDark ? "rgba(122, 167, 255, 0.22)" : "rgba(4, 125, 115, 0.14)",
              color: "text.primary",
              border: "1px solid",
              borderColor: isDark ? "rgba(255, 255, 255, 0.14)" : "rgba(4, 125, 115, 0.18)",
              backdropFilter: "blur(16px)",
              boxShadow: isDark
                ? "0 16px 50px rgba(0, 0, 0, 0.3)"
                : "0 16px 40px rgba(43, 88, 118, 0.18)",
              "&:hover": {
                bgcolor: isDark ? "rgba(122, 167, 255, 0.3)" : "rgba(4, 125, 115, 0.2)",
              },
            }}
          >
            {isDark ? "Light mode" : "Dark mode"}
          </Button>

          <Chip
            icon={<ExploreIcon />}
            label={isMoving ? "Walking to checkpoint..." : "Click a glowing checkpoint"}
            color={isMoving ? "secondary" : "primary"}
            variant="filled"
            sx={{
              justifyContent: "flex-start",
              borderRadius: 2,
              px: 1,
              py: 2.8,
              bgcolor: isMoving ? "rgba(101, 167, 255, 0.18)" : "rgba(56, 247, 199, 0.18)",
              color: "text.primary",
              border: "1px solid rgba(255, 255, 255, 0.14)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 16px 50px rgba(0, 0, 0, 0.28)",
              "& .MuiChip-label": {
                fontWeight: 800,
              },
            }}
          />
        </Stack>
      </Stack>

      <Box sx={{ pointerEvents: "auto" }}>
        <SectionDialog open={Boolean(section)} section={section} onClose={onCloseSection} />
      </Box>
    </Box>
  );
};
