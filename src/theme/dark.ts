import type { ThemeOptions } from "@mui/material";

export const darkMuiThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    background: {
      default: "#060914",
      paper: "#101827",
    },
    primary: {
      main: "#38f7c7",
    },
    secondary: {
      main: "#7aa7ff",
    },
    text: {
      primary: "#f8fafc",
      secondary: "#b6c3d7",
    },
  },
};

export const darkSceneTheme = {
  sky: "#060914",
  fog: "#151f36",
  ground: "#253042",
  roadPrimary: "#171d2a",
  roadSecondary: "#202839",
  checkpoint: "#7aa7ff",
  checkpointActive: "#38f7c7",
  pathDot: "#f7c948",
  ambientLight: 0.42,
  directionalLight: 1.25,
  directionalColor: "#d9e6ff",
  showStars: true,
  showClouds: false,
} as const;
