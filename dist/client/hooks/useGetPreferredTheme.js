"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetPreferredTheme = exports.LOCAL_STORAGE_KEY = exports.LIGHT_THEME = exports.DARK_THEME = void 0;
const React = __importStar(require("react"));
exports.DARK_THEME = "dark";
exports.LIGHT_THEME = "light";
exports.LOCAL_STORAGE_KEY = "theme";
// Updates the theme using the JavaScript code defined in the _document.tsx file
function useGetPreferredTheme() {
    const [userPreferredTheme, setUserPreferredTheme] = React.useState(exports.DARK_THEME);
    React.useEffect(() => {
        // We must check for typeof window !== "undefined" instead of window !== undefined
        // because typeof does not evaluate window but only get its type
        // https://dev.to/vvo/how-to-solve-window-is-not-defined-errors-in-react-and-next-js-5f97
        if (typeof window !== "undefined" &&
            window.__theme &&
            (window.__theme === exports.DARK_THEME || window.__theme === exports.LIGHT_THEME)) {
            setUserPreferredTheme(window.__theme);
        }
    }, []);
    function updatePreferredTheme() {
        if (typeof window !== "undefined" &&
            window.__theme &&
            window.__setPreferredTheme) {
            const newTheme = window.__theme === exports.DARK_THEME ? exports.LIGHT_THEME : exports.DARK_THEME;
            setUserPreferredTheme(newTheme);
            window.__setPreferredTheme(newTheme);
        }
    }
    return [userPreferredTheme, updatePreferredTheme];
}
exports.useGetPreferredTheme = useGetPreferredTheme;
//# sourceMappingURL=useGetPreferredTheme.js.map