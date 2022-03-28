import { DefaultTheme, DarkTheme } from "@react-navigation/native";

// export const colorScheme = {
//   splash: "#22292F",
//   white: "#fafafa",
//   gray: "#757575",
//   silver: "#CFD8DC",
//   errorBackground: "#f6f6f6",
//   // main: "#05D9C5",
//   // secondary: "#EFC7A2",
//   // font: "#e8e6e1",
//   // screenBackground: "#27241d",
//   // cardBackground: "#423d33",
// };

export const colorScheme = {
  primary: "#1E1E1E",
  secondary: "#3B3B3B",
  lightGreen: "#4BEE70",
  red: "#D84035",

  white: "#fff",
  black: "#000000",
  gray: "#212125",
  gray1: "#1f1f1f",
  lightGray: "#3B3B3B",
  lightGray2: "#212125",
  lightGray3: "#757575",
  transparentWhite: "rgba(255, 255, 255, 0.2)",
  transparentBlack: "rgba(0, 0, 0, 0.8)",
  transparentBlack1: "rgba(0, 0, 0, 0.4)",
};

export const customLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#14937C",
    background: "#fafafa",
    card: "#fff",
    text: "#212121",
    // border: "rgb(199, 199, 204)",
    notification: "#FFA726",
  },
};

export const customLightTheme2 = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#14937C",
    background: "#fafafa",
    card: "#fff",
    text: "#212121",
    // border: "rgb(199, 199, 204)",
    notification: "#FFA726",
  },
};

export const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#05D9C5",
    background: "#1E2025",
    card: "#3B424C",
    text: "#ADB0B6",
    // border: "rgb(199, 199, 204)",
    notification: "#EFC7A2",
  },
};

export const customDarkTheme2 = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#05D9C5",
    background: "#1E2025",
    card: "#3B424C",
    text: "#ADB0B6",
    // border: "rgb(199, 199, 204)",
    notification: "#EFC7A2",
  },
};
