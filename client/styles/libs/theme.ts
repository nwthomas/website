export type ThemeEnum = "dark" | "light";

// ===================================== Color Assignment Variables
// All color names pulled directly from http://chir.ag/projects/name-that-color/
interface Colors {
  eastSide: string;
  justRight: string;
  mineShaft: string;
  portage: string;
  sinbad: string;
  transparent: string;
  white: string;
  woodsmoke: string;
}
export const colors: Colors = {
  eastSide: "#AC9DD1",
  justRight: "#F1D3C2",
  mineShaft: "#333333",
  portage: "#8CA6EB",
  sinbad: "#a9d4d4",
  transparent: "transparent",
  white: "#ffffff",
  woodsmoke: "#161618",
};

// ===================================== Color Theme
interface ThemeColorValues {
  bodyBackground: string;
  text: string;
  transparent: string;
}
export const themeColorValues: ThemeColorValues = {
  bodyBackground: "var(--body-bg)",
  text: "var(--text)",
  transparent: "var(--transparent)",
};

// ===================================== Space Variables
interface AppDimensions {
  appHorizontalGutters: string;
  appMaxWidth: string;
  appMinHeight: string;
  articleHeroImageMaxWidth: string;
  articleMaxWidth: string;
  footerHeight: string;
  navbarHeight: string;
  navbarLinkWidth: string;
}
export const appDimensions: AppDimensions = {
  appHorizontalGutters: "6%",
  appMaxWidth: "1800px",
  appMinHeight: "100vh",
  articleHeroImageMaxWidth: "1200px",
  articleMaxWidth: "600px",
  footerHeight: "200px",
  navbarHeight: "200px",
  navbarLinkWidth: "120px",
};

interface BorderRadii {
  nano: string;
  micro: string;
  small: string;
  medium: string;
  large: string;
  xLarge: string;
  infinity: string;
}
const borderRadii: BorderRadii = {
  nano: "2px",
  micro: "3px",
  small: "5px",
  medium: "8px",
  large: "10px",
  xLarge: "15px",
  infinity: "9999px",
};

interface Breakpoints {
  mobile: string;
  desktop: string;
  ultraWide: string;
}
const breakpoints: Breakpoints = {
  mobile: "600px",
  desktop: "1000px",
  ultraWide: "1200px",
};

interface Opacity {
  opacity00: number;
  opacity10: number;
  opacity20: number;
  opacity30: number;
  opacity40: number;
  opacity50: number;
  opacity60: number;
  opacity70: number;
  opacity80: number;
  opacity90: number;
  opacity100: number;
}
const opacity: Opacity = {
  opacity00: 0,
  opacity10: 0.1,
  opacity20: 0.2,
  opacity30: 0.3,
  opacity40: 0.4,
  opacity50: 0.5,
  opacity60: 0.6,
  opacity70: 0.7,
  opacity80: 0.8,
  opacity90: 0.9,
  opacity100: 1,
};

interface Spaces {
  nano: string;
  micro: string;
  small: string;
  medium: string;
  large: string;
  xLarge: string;
  xxLarge: string;
  jumbo: string;
}
const spaces: Spaces = {
  nano: "2px",
  micro: "5px",
  small: "10px",
  medium: "30px",
  large: "40px",
  xLarge: "50px",
  xxLarge: "70px",
  jumbo: "100px",
};

interface Transitions {
  short: string;
  medium: string;
  long: string;
  xLong: string;
}
const transitions: Transitions = {
  short: "0.03s",
  medium: "0.05s",
  long: "0.1s",
  xLong: "0.5s",
};

export interface Theme {
  appDimensions: AppDimensions;
  breakpoints: Breakpoints;
  borderRadii: BorderRadii;
  colors: ThemeColorValues;
  colorsHex: Colors;
  currentTheme: ThemeEnum;
  opacity: Opacity;
  spaces: Spaces;
  transitions: Transitions;
}

// ===================================== Main Theme
function makeMainTheme(currentTheme: ThemeEnum): Theme {
  return {
    appDimensions,
    breakpoints,
    borderRadii,
    colors: themeColorValues,
    colorsHex: colors,
    currentTheme,
    opacity,
    spaces,
    transitions,
  };
}

export default makeMainTheme;
