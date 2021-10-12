"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const contactSlice_1 = __importDefault(require("./contactSlice"));
const modalSlice_1 = __importDefault(require("./modalSlice"));
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        contact: contactSlice_1.default,
        modal: modalSlice_1.default,
    },
});
//# sourceMappingURL=index.js.map