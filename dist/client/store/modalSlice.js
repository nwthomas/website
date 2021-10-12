"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateModalValues = exports.bannerSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    buttonLabel: "",
    message: "",
    shouldShowModal: false,
};
exports.bannerSlice = (0, toolkit_1.createSlice)({
    name: "modal",
    initialState,
    reducers: {
        updateModalValues: (state, action) => {
            var _a, _b, _c, _d;
            state.buttonLabel = ((_a = action.payload) === null || _a === void 0 ? void 0 : _a.buttonLabel) || state.buttonLabel;
            state.message = ((_b = action.payload) === null || _b === void 0 ? void 0 : _b.message) || state.message;
            state.shouldShowModal =
                (_d = (_c = action.payload) === null || _c === void 0 ? void 0 : _c.shouldShowModal) !== null && _d !== void 0 ? _d : state.shouldShowModal;
        },
    },
});
exports.updateModalValues = exports.bannerSlice.actions.updateModalValues;
exports.default = exports.bannerSlice.reducer;
//# sourceMappingURL=modalSlice.js.map