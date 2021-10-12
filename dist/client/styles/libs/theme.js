"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDimensions = exports.themeColorValues = exports.colors = void 0;
exports.colors = {
    alabaster: "#f8f8f8f8",
    black: "#000000",
    cabaret: "#D9406E",
    fireBush: "#eb9c31",
    forestGreen: "#357d22",
    mercury: "#e2e2e2",
    mineShaft: "#333333",
    transparent: "transparent",
    royalBlue: "#3870E0",
    scarlet: "#FF3700",
    shark: "#27272A",
    white: "#ffffff",
    woodsmoke: "#161618",
};
exports.themeColorValues = {
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
exports.appDimensions = {
    appHorizontalGutters: "6%",
    appMaxWidth: "1600px",
    appMinHeight: "100vh",
    articleHeroImageMaxWidth: "1200px",
    articleMaxWidth: "600px",
    footerDesktopHeight: "200px",
    footerMobileHeight: "220px",
    modalMaxWidth: "600px",
    navbarHeight: "200px",
    navbarLinkWidth: "120px",
};
const borderRadii = {
    nano: "2px",
    micro: "3px",
    small: "5px",
    medium: "8px",
    large: "15px",
    xLarge: "20px",
    xxLarge: "25px",
    infinity: "9999px",
};
const breakpoints = {
    mini: "400px",
    tablet: "600px",
    desktop: "1000px",
    ultraWide: "1200px",
};
const opacity = {
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
const spaces = {
    nano: "2px",
    micro: "5px",
    small: "10px",
    medium: "20px",
    large: "40px",
    xLarge: "50px",
    xxLarge: "70px",
    jumbo: "100px",
};
const transitions = {
    short: "0.1s",
    medium: "0.3s",
    long: "0.5s",
};
// ===================================== Main Theme
function makeMainTheme(currentTheme) {
    return {
        appDimensions: exports.appDimensions,
        breakpoints,
        borderRadii,
        colors: exports.themeColorValues,
        colorsHex: exports.colors,
        currentTheme,
        opacity,
        spaces,
        transitions,
    };
}
exports.default = makeMainTheme;
//# sourceMappingURL=theme.js.map