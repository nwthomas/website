import { ThemeEnum } from "../../store/reducers/themeSlice";

// A good source for gradients is: https://webgradients.com

// ===================================== Color Assignment Variables
// All color names pulled directly from http://chir.ag/projects/name-that-color/
// To change the assignment of colors --> CSS variables, go to: styles/libs/global.ts
interface Colors {
  alabaster: "#fafafa";
  alto: "#DBDBDB";
  black: "#000000";
  brightSun: "#FACF3D";
  burntSienna: "#ED6A5E";
  casablanca: "#F5BF4F";
  codGray: "#111010";
  doveGray: "#707070";
  eerieBlack: "#171717";
  manatee: "#8E8E90";
  mantis: "#62C554";
  mercury: "#E1E1E1";
  mineShaft: "#333333";
  outerSpace: "#373A3D";
  red: "red";
  royalBlue: "#2D6EEE";
  shark: "#202325";
  silver: "#C2C2C2";
  white: "#FFFFFF";
}

export const colors: Colors = {
  alabaster: "#fafafa",
  alto: "#DBDBDB",
  black: "#000000",
  brightSun: "#FACF3D",
  burntSienna: "#ED6A5E",
  casablanca: "#F5BF4F",
  codGray: "#111010",
  doveGray: "#707070",
  eerieBlack: "#171717",
  manatee: "#8E8E90",
  mantis: "#62C554",
  mercury: "#E1E1E1",
  mineShaft: "#333333",
  outerSpace: "#373A3D",
  red: "red",
  royalBlue: "#2D6EEE",
  silver: "#C2C2C2",
  shark: "#202325",
  white: "#FFFFFF",
};

// ===================================== Space Variables
interface AppDimensions {
  appHorizontalGutters: string;
  appMaxWidth: string;
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
}

export const appDimensions: AppDimensions = {
  appHorizontalGutters: "3%",
  appMaxWidth: "1400px",
  articleHeroImageMaxWidth: "1400px",
  articleMaxWidth: "600px",
  contactFormMaxWidth: "650px",
  footerDesktopHeight: "108px",
  footerTabletHeight: "164px",
  footerMobileHeight: "90px",
  modalMaxWidth: "600px",
  navbarDesktopHeight: "179px",
  navbarTabletHeight: "179px",
  navbarMobileHeight: "71px",
};

interface BorderRadii {
  nano: string;
  micro: string;
  small: string;
  medium: string;
  large: string;
  xLarge: string;
  xxLarge: string;
  jumbo: string;
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
  jumbo: "35px",
  infinity: "9999px",
};

interface BreakpointsInt {
  mini: number;
  tablet: number;
  desktop: number;
  ultrawide: number;
}
export const breakpointsInt: BreakpointsInt = {
  mini: 400,
  tablet: 600,
  desktop: 1000,
  ultrawide: 1400,
};

interface Breakpoints {
  mini: string;
  tablet: string;
  desktop: string;
  ultrawide: string;
}

export const breakpoints: Breakpoints = (function buildBreakpoints() {
  // Empty strings here are to keep TypeScript happy prior to assignment, but this will always
  // be valid pixel values in a string for actual use due to the IIFE invocation.
  const breakpoints = {
    mini: "",
    tablet: "",
    desktop: "",
    ultrawide: "",
  };

  for (const key in breakpointsInt) {
    breakpoints[key] = `${breakpointsInt[key]}px`;
  }

  return breakpoints;
})();

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

export const transitions: Transitions = {
  short: "0.1s",
  medium: "0.3s",
  long: "0.5s",
};

export interface Theme {
  appDimensions: AppDimensions;
  breakpoints: Breakpoints;
  breakpointsInt: BreakpointsInt;
  borderRadii: BorderRadii;
  colorsHex: Colors;
  currentTheme: ThemeEnum | null;
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
    colorsHex: colors,
    currentTheme,
    spaces,
    transitions,
  };
}

export default makeMainTheme;
