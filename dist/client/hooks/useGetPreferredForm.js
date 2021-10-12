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
exports.useGetPreferredForm = exports.LOCAL_STORAGE_KEY = exports.WEB3_KEY = exports.WEB2_KEY = void 0;
const React = __importStar(require("react"));
exports.WEB2_KEY = "web2";
exports.WEB3_KEY = "web3";
exports.LOCAL_STORAGE_KEY = "preferredForm";
// Updates the preferredForm using JavaScript code defined in the _document.tsx file
function useGetPreferredForm() {
    const [userPreferredForm, setUserPreferredForm] = React.useState(exports.WEB2_KEY);
    React.useEffect(() => {
        // We must check for typeof window !== "undefined" instead of window !== undefined
        // because typeof does not evaluate window but only get its type
        // https://dev.to/vvo/how-to-solve-window-is-not-defined-errors-in-react-and-next-js-5f97
        if (typeof window !== "undefined" &&
            window.__preferredForm &&
            (window.__preferredForm === exports.WEB2_KEY ||
                window.__preferredForm === exports.WEB3_KEY)) {
            setUserPreferredForm(window.__preferredForm);
        }
    }, []);
    function updatePreferredForm() {
        if (typeof window !== "undefined" &&
            window.__preferredForm &&
            window.__setPreferredForm) {
            const newPreferredForm = window.__preferredForm === exports.WEB2_KEY ? exports.WEB3_KEY : exports.WEB2_KEY;
            setUserPreferredForm(newPreferredForm);
            window.__setPreferredForm(newPreferredForm);
        }
    }
    return [userPreferredForm, updatePreferredForm];
}
exports.useGetPreferredForm = useGetPreferredForm;
//# sourceMappingURL=useGetPreferredForm.js.map