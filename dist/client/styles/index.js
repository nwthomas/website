"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeMainTheme = void 0;
const styled_components_1 = require("styled-components");
const global_1 = __importDefault(require("./libs/global"));
const reset_1 = __importDefault(require("./libs/reset"));
var theme_1 = require("./libs/theme");
Object.defineProperty(exports, "makeMainTheme", { enumerable: true, get: function () { return __importDefault(theme_1).default; } });
const GlobalStyleWithReset = (0, styled_components_1.createGlobalStyle) `
    ${reset_1.default}
    ${global_1.default}
`;
exports.default = GlobalStyleWithReset;
//# sourceMappingURL=index.js.map