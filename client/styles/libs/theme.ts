import { DARK_THEME, ThemeEnum } from "../../store/reducers/themeSlice";

// A good source for gradients is: https://webgradients.com

// ===================================== Color Assignment Variables
// All color names pulled directly from http://chir.ag/projects/name-that-color/
// To change the assignment of colors --> CSS variables, go to: styles/libs/global.ts
interface Colors {
  alto: "#DBDBDB";
  black: "#000000";
  brightSun: "#FACF3D";
  codGray: "#111010";
  doveGray: "#707070";
  eerieBlack: "#171717";
  hookersGreen: "#5F8181";
  juniper: "#729797";
  manatee: "#8E8E90";
  mercury: "#E1E1E1";
  mineShaft: "#333333";
  outerSpace: "#373A3D";
  pictonBlue: "#4597EC";
  redViolet: "#d41872";
  rose: "#ff0066";
  shark: "#202325";
  studio: "#a445b2";
  silver: "#C2C2C2";
  white: "#FFFFFF";
}

export const colors: Colors = {
  alto: "#DBDBDB",
  black: "#000000",
  brightSun: "#FACF3D",
  codGray: "#111010",
  doveGray: "#707070",
  eerieBlack: "#171717",
  hookersGreen: "#5F8181",
  juniper: "#729797",
  manatee: "#8E8E90",
  mercury: "#E1E1E1",
  mineShaft: "#333333",
  outerSpace: "#373A3D",
  pictonBlue: "#4597EC",
  redViolet: "#d41872",
  rose: "#ff0066",
  silver: "#C2C2C2",
  shark: "#202325",
  studio: "#a445b2",
  white: "#FFFFFF",
};

// A crucial tool for testing out dropshadows is: https://www.cssmatic.com/box-shadow
interface Dropshadows {
  small: string;
}
type DropshadowsFunction = (currentTheme: ThemeEnum | null) => Dropshadows;
const dropshadows: DropshadowsFunction = (currentTheme) => ({
  small: `0px 2px 19px -2px rgba(${
    currentTheme === DARK_THEME ? "255, 255, 255" : "0, 0, 0"
  }, 0.14)`,
});

// ===================================== Color Theme
interface ThemeColorValues {
  bodyBackground: string;
  bodyBackgroundAccentOne: string;
  bodyBackgroundAccentTwo: string;
  buttonPrimaryBackground: string;
  codeBackground: string;
  error: string;
  text: string;
  textAccentOne: string;
  textAccentTwo: string;
  textSecondary: string;
  selection: string;
}
export const themeColorValues: ThemeColorValues = {
  bodyBackground: "var(--body-bg)",
  bodyBackgroundAccentOne: "var(--body-bg-accent-one)",
  bodyBackgroundAccentTwo: "var(--body-bg-accent-two)",
  buttonPrimaryBackground: "var(--button-primary-bg)",
  codeBackground: "var(--code-bg)",
  error: "var(--error)",
  text: "var(--text)",
  textAccentOne: "var(--text-accent-one)",
  textAccentTwo: "var(--text-accent-two)",
  textSecondary: "var(--text-secondary)",
  selection: "var(--selection)",
};

// ===================================== Space Variables
interface AppDimensions {
  appHorizontalGutters: string;
  appMaxWidth: string;
  appMinHeight: string;
  articleHeroImageMaxWidth: string;
  articleMaxWidth: string;
  contactFormMaxWidth: string;
  footerDesktopHeight: string;
  footerTabletHeight: string;
  footerMobileHeight: string;
  modalMaxWidth: string;
  navbarDesktopHeight: string;
  navbarTabletHeight: string;
  navbarMobileHeight: string;
  navbarLinkWidth: string;
}
export const appDimensions: AppDimensions = {
  appHorizontalGutters: "3%",
  appMaxWidth: "1200px",
  // This value is set in the global.ts file for the :root selector
  appMinHeight: "var(--app-min-height)",
  articleHeroImageMaxWidth: "1200px",
  articleMaxWidth: "600px",
  contactFormMaxWidth: "600px",
  footerDesktopHeight: "108px",
  footerTabletHeight: "164px",
  footerMobileHeight: "90px",
  modalMaxWidth: "600px",
  navbarDesktopHeight: "179px",
  navbarTabletHeight: "179px",
  navbarMobileHeight: "71px",
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
export const borderRadii: BorderRadii = {
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
}
const breakpointsInt: BreakpointsInt = {
  mini: 400,
  tablet: 600,
  desktop: 1000,
};

interface Breakpoints {
  mini: string;
  tablet: string;
  desktop: string;
}
const breakpoints: Breakpoints = (function buildBreakpoints() {
  // Empty strings here are to keep TypeScript happy prior to assignment
  const breakpoints = {
    mini: "",
    tablet: "",
    desktop: "",
  };

  for (const key in breakpointsInt) {
    breakpoints[key] = `${breakpointsInt[key]}px`;
  }

  return breakpoints;
})();

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
  xxSmall: string;
  xSmall: string;
  small: string;
  medium: string;
  large: string;
  xLarge: string;
  xxLarge: string;
  jumbo: string;
}
export const spaces: Spaces = {
  nano: "2px",
  micro: "3px",
  xxSmall: "6px",
  xSmall: "8px",
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
