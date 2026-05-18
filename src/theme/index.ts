import { createTheme } from "@mui/material";
import { darkMuiThemeOptions, darkSceneTheme } from "./dark";
import { lightMuiThemeOptions, lightSceneTheme } from "./light";

export type ColorMode = "dark" | "light";

export type SceneTheme = {
  sky: string;
  fog: string;
  ground: string;
  roadPrimary: string;
  roadSecondary: string;
  checkpoint: string;
  checkpointActive: string;
  pathDot: string;
  ambientLight: number;
  directionalLight: number;
  directionalColor: string;
  showStars: boolean;
  showClouds: boolean;
};

const sharedThemeOptions = {
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontWeight: 900,
      letterSpacing: 0,
    },
    h2: {
      fontWeight: 900,
      letterSpacing: 0,
    },
    button: {
      fontWeight: 800,
      letterSpacing: 0,
      textTransform: "none",
    },
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: "none",
        },
      },
    },
  },
} as const;

export const muiThemes = {
  dark: createTheme(sharedThemeOptions, darkMuiThemeOptions),
  light: createTheme(sharedThemeOptions, lightMuiThemeOptions),
};

export const sceneThemes: Record<ColorMode, SceneTheme> = {
  dark: darkSceneTheme,
  light: lightSceneTheme,
};
