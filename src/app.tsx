import { useMemo, useState } from "react";
import { Box, CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { Scene } from "./components/scene";
import { UIOverlay } from "./ui/ui-overlay";
import {
  type CheckpointData,
  type SectionId,
  sections,
  type Vector3Tuple,
} from "./data/sections";
import { type ColorMode, muiThemes, sceneThemes } from "./theme";

export const App = () => {
  const [colorMode, setColorMode] = useState<ColorMode>("dark");
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [pendingSection, setPendingSection] = useState<SectionId | null>(null);
  const [targetPosition, setTargetPosition] = useState<Vector3Tuple | null>(
    null,
  );
  const [isMoving, setIsMoving] = useState(false);

  const activeSectionData = useMemo(
    () => sections.find((section) => section.id === activeSection),
    [activeSection],
  );

  const theme = muiThemes[colorMode];
  const sceneTheme = sceneThemes[colorMode];

  const handleToggleColorMode = () => {
    setColorMode((currentMode) => (currentMode === "dark" ? "light" : "dark"));
  };

  const handleCheckpointSelect = (checkpoint: CheckpointData) => {
    if (isMoving) return;

    setActiveSection(null);
    setPendingSection(checkpoint.id);
    setTargetPosition([...checkpoint.position]);
    setIsMoving(true);
  };

  const handleArrive = () => {
    setIsMoving(false);
    setActiveSection(pendingSection);
    setPendingSection(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          html: { width: "100%", height: "100%" },
          body: { width: "100%", height: "100%", overflow: "hidden" },
          "#root": { width: "100%", height: "100%" },
        }}
      />
      <Box
        component="main"
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          bgcolor: "background.default",
        }}
      >
        <Scene
          activeSection={activeSection}
          targetPosition={targetPosition}
          isMoving={isMoving}
          colorMode={colorMode}
          sceneTheme={sceneTheme}
          onCheckpointSelect={handleCheckpointSelect}
          onArrive={handleArrive}
        />

        <UIOverlay
          colorMode={colorMode}
          isMoving={isMoving}
          section={activeSectionData}
          onToggleColorMode={handleToggleColorMode}
          onCloseSection={() => setActiveSection(null)}
        />
      </Box>
    </ThemeProvider>
  );
};
