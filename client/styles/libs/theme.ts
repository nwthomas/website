import { ThemeEnum, DARK_THEME } from "./../../hooks/useGetPreferredTheme";

// ===================================== Color Assignment Variables
// All color names pulled directly from http://chir.ag/projects/name-that-color/
interface Colors {
  alabaster: string;
  black: string;
  bunker: string;
  fireBush: string;
  forestGreen: string;
  mercury: string;
  mineShaft: string;
  pictonBlue: string;
  transparent: string;
  royalBlue: string;
  scarlet: string;
  shark: string;
  silver: string;
  white: string;
}
export const colors: Colors = {
  alabaster: "#f8f8f8f8",
  black: "#000000",
  bunker: "#0D1117",
  fireBush: "#eb9c31",
  forestGreen: "#357d22",
  mercury: "#e2e2e2",
  mineShaft: "#333333",
  pictonBlue: "#4597EC",
  transparent: "transparent",
  royalBlue: "#5f63ec",
  scarlet: "#FF3700",
  shark: "#27272A",
  silver: "#cccccc",
  white: "#ffffff",
};

// ===================================== Color Theme
interface ThemeColorValues {
  bodyBackground: string;
  bodyBackgroundAccentOne: string;
  bodyBackgroundAccentTwo: string;
  bodyBackgroundAccentThree: string;
  buttonPrimaryBackground: string;
  buttonSecondaryBackground: string;
  error: string;
  success: string;
  text: string;
  transparent: string;
}
export const themeColorValues: ThemeColorValues = {
  bodyBackground: "var(--body-bg)",
  bodyBackgroundAccentOne: "var(--body-bg-accent-one)",
  bodyBackgroundAccentTwo: "var(--body-bg-accent-two)",
  bodyBackgroundAccentThree: "var(--body-bg-accent-three)",
  buttonPrimaryBackground: "var(--button-primary-bg)",
  buttonSecondaryBackground: "var(--button-secondary-bg)",
  error: "var(--error)",
  success: "var(--success)",
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
  footerDesktopHeight: string;
  footerMobileHeight: string;
  modalMaxWidth: string;
  navbarDesktopHeight: string;
  navbarMobileHeight: string;
  navbarLinkWidth: string;
}
export const appDimensions: AppDimensions = {
  appHorizontalGutters: "5%",
  appMaxWidth: "1600px",
  appMinHeight: "100vh",
  articleHeroImageMaxWidth: "1200px",
  articleMaxWidth: "600px",
  footerDesktopHeight: "200px",
  footerMobileHeight: "260px",
  modalMaxWidth: "600px",
  navbarDesktopHeight: "200px",
  navbarMobileHeight: "150px",
  navbarLinkWidth: "120px",
};

interface BorderRadii {
  nano: string;
  micro: string;
  small: string;
  medium: string;
  large: string;
  xLarge: string;
  xxLarge: string;
  infinity: string;
}
const borderRadii: BorderRadii = {
  nano: "2px",
  micro: "3px",
  small: "5px",
  medium: "8px",
  large: "15px",
  xLarge: "20px",
  xxLarge: "25px",
  infinity: "9999px",
};

interface BreakpointsInt {
  mini: number;
  tablet: number;
  desktop: number;
  ultraWide: number;
}
const breakpointsInt: BreakpointsInt = {
  mini: 400,
  tablet: 600,
  desktop: 1000,
  ultraWide: 1200,
};
interface Breakpoints {
  mini: string;
  tablet: string;
  desktop: string;
  ultraWide: string;
}
const breakpoints: Breakpoints = (function buildBreakpoints() {
  // Empty strings here is done to keep TypeScript happy
  const breakpoints = {
    mini: "",
    tablet: "",
    desktop: "",
    ultraWide: "",
  };

  for (const key in breakpointsInt) {
    breakpoints[key] = `${breakpointsInt[key]}px`;
  }

  return breakpoints;
})();

// A crucial tool for testing out dropshadows is: https://www.cssmatic.com/box-shadow
interface Dropshadows {
  small: string;
}
type DropshadowsFunction = (currentTheme: ThemeEnum | null) => Dropshadows;
const dropshadows: DropshadowsFunction = (currentTheme) => ({
  small: `0px 2px 19px -2px rgba(${
    currentTheme === DARK_THEME ? "255, 255, 255" : "0, 0, 0"
  }, 0.13)`,
});

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
  medium: "20px",
  large: "40px",
  xLarge: "50px",
  xxLarge: "70px",
  jumbo: "100px",
};

interface Transitions {
  short: string;
  medium: string;
  long: string;
}
const transitions: Transitions = {
  short: "0.1s",
  medium: "0.3s",
  long: "0.5s",
};

export interface Theme {
  appDimensions: AppDimensions;
  breakpoints: Breakpoints;
  breakpointsInt: BreakpointsInt;
  borderRadii: BorderRadii;
  colors: ThemeColorValues;
  colorsHex: Colors;
  currentTheme: ThemeEnum | null;
  dropshadows: Dropshadows;
  opacity: Opacity;
  spaces: Spaces;
  transitions: Transitions;
}

// ===================================== Main Theme
function makeMainTheme(currentTheme: ThemeEnum | null): Theme {
  return {
    appDimensions,
    breakpoints,
    breakpointsInt,
    borderRadii,
    colors: themeColorValues,
    colorsHex: colors,
    currentTheme,
    dropshadows: dropshadows(currentTheme),
    opacity,
    spaces,
    transitions,
  };
}

export default makeMainTheme;
