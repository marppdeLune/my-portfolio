import type { ThemeOptions } from "@mui/material";

export const lightMuiThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    background: {
      default: "#f7fbff",
      paper: "#ffffffce",
    },
    primary: {
      main: "#047d73",
    },
    secondary: {
      main: "#3164d4",
    },
    text: {
      primary: "#102032",
      secondary: "#526171",
    },
  },
};

export const lightSceneTheme = {
  sky: "#bfe7ff",
  fog: "#dff5ff",
  ground: "#8fc9a3",
  roadPrimary: "#5f6570",
  roadSecondary: "#717986",
  checkpoint: "#3164d4",
  checkpointActive: "#047d73",
  pathDot: "#fff7bf",
  ambientLight: 0.82,
  directionalLight: 1.9,
  directionalColor: "#fff4cf",
  showStars: false,
  showClouds: true,
} as const;
