import { DefaultTheme, DarkTheme } from "@react-navigation/native";

export type Theme = "light" | "dark";

export type ColorDefinitions =
  | "primary"
  | "background"
  | "buttonDisable"
  | "textDisable"
  | "textWhite"
  | "textSecondary"
  | "inputBackground"
  | "mediumDark"
  | "inactiveTabBar"
  | "notifyView"
  | "textGreen"
  | "errorText";

const themeColors: {
  [key in ColorDefinitions]: {
    light: string;
    dark: string;
  };
} = {
  primary: {
    light: "#ff4081",
    dark: "#282828",
  },
  background: {
    light: "#f4f4f4",
    dark: "#F9FCFF",
  },
  buttonDisable: {
    light: "#D3D3D3",
    dark: "#D3D3D3",
  },
  textDisable: {
    light: "#eee",
    dark: "#ddd",
  },
  textWhite: {
    light: "#fff",
    dark: "#282828",
  },
  textSecondary: {
    light: "#9e9e9e",
    dark: "#9e9e9e",
  },
  inputBackground: {
    light: "#F2F7FC",
    dark: "#F00",
  },
  mediumDark: {
    light: "rgba(0, 0, 0, 0.7)",
    dark: "rgba(0, 0, 0, 0.7)",
  },
  inactiveTabBar: {
    light: "#F1F4F8",
    dark: "#F00",
  },
  notifyView: {
    light: "#e5fbf3",
    dark: "#e5fbf3",
  },
  textGreen: {
    light: "#31987c",
    dark: "#31987c",
  },
  errorText: {
    light: "#D02828",
    dark: "#D02828",
  },
};

const getColors = (theme: Theme): { [key in ColorDefinitions]: string } => {
  let colors = {} as {
    [key in ColorDefinitions]: string;
  };
  const keys = Object.keys(themeColors) as ColorDefinitions[];
  keys.forEach((key) => (colors[key] = themeColors[key][theme]));

  return colors;
};

const themes = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: themeColors.primary.light,
      background: themeColors.background.light,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: themeColors.primary.dark,
      background: themeColors.background.dark,
    },
  },
};

export { themeColors, getColors, themes };
