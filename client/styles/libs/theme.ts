import { DARK_THEME, ThemeEnum } from "../../store/themeSlice";

// ===================================== Color Assignment Variables
// All color names pulled directly from http://chir.ag/projects/name-that-color/
// To change the assignment of colors --> CSS variables, go to: styles/libs/global.ts
interface Colors {
  alabaster: "#F8F8F8";
  alto: "#DBDBDB";
  black: "#000000";
  brightSun: "#FACF3D";
  doveGray: "#707070";
  mercury: "#E1E1E1";
  mineShaft: "#333333";
  outerSpace: "#373A3D";
  pictonBlue: "#4597EC";
  royalBlue: "#5f63EC";
  rollingStone: "#717579";
  scarlet: "#FF3700";
  shark: "#202325";
  transparent: "transparent";
  white: "#FFFFFF";
  woodsmoke: "#131416";
}

export const colors: Colors = {
  alabaster: "#F8F8F8",
  alto: "#DBDBDB",
  black: "#000000",
  brightSun: "#FACF3D",
  doveGray: "#707070",
  mercury: "#E1E1E1",
  mineShaft: "#333333",
  outerSpace: "#373A3D",
  pictonBlue: "#4597EC",
  rollingStone: "#717579",
  royalBlue: "#5f63EC",
  scarlet: "#FF3700",
  shark: "#202325",
  transparent: "transparent",
  white: "#FFFFFF",
  woodsmoke: "#131416",
};

// Gradients
interface Gradients {
  getContactFormBorder: (radians: number) => string;
  getHeaderBackground: () => string;
  getLinkText: (
    colorOne: string,
    colorTwo: string,
    colorThree: string
  ) => string;
}

const gradients: Gradients = {
  getContactFormBorder: (radians: number) => {
    return `linear-gradient(calc(${radians}rad), #37ecba 0%, #72afd3 50%, rgba(121,40,202,0) 75%)`;
  },
  getHeaderBackground: () => {
    return `linear-gradient(180deg, ${themeColorValues.bodyBackground} 60%, rgba(121,40,202,0) 100%)`;
  },
  getLinkText: (
    colorOne: string,
    colorTwo: string,
    colorThree: string
  ): string => {
    return `linear-gradient(120deg, ${colorOne} 0%, ${colorTwo} 55%, ${colorThree} 100%)`;
  },
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
  error: string;
  text: string;
  selection: string;
  textSecondary: string;
  transparent: string;
}
export const themeColorValues: ThemeColorValues = {
  bodyBackground: "var(--body-bg)",
  bodyBackgroundAccentOne: "var(--body-bg-accent-one)",
  bodyBackgroundAccentTwo: "var(--body-bg-accent-two)",
  buttonPrimaryBackground: "var(--button-primary-bg)",
  error: "var(--error)",
  text: "var(--text)",
  selection: "var(--selection)",
  textSecondary: "var(--text-secondary)",
  transparent: "var(--transparent)",
};

// ===================================== Space Variables
interface AppDimensions {
  appHorizontalGutters: string;
  appMaxWidth: string;
  appMinHeight: string;
  articleHeroImageMaxWidth: string;
  articleMaxWidth: string;
  contactFormMaxWidth: string;
  footerArticleHeight: string;
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
  footerArticleHeight: "198px",
  footerDesktopHeight: "99px",
  footerTabletHeight: "147px",
  footerMobileHeight: "96px",
  modalMaxWidth: "600px",
  navbarDesktopHeight: "181px",
  navbarTabletHeight: "181px",
  navbarMobileHeight: "81px",
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
  // Empty strings here are to keep TypeScript happy prior to assignment
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
  gradients: Gradients;
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
    gradients,
    opacity,
    spaces,
    transitions,
  };
}

export default makeMainTheme;
