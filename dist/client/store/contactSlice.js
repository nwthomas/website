"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMessage = exports.contactSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    message: {
        name: "",
        email: "",
        message: "",
        fax: "",
    },
};
exports.contactSlice = (0, toolkit_1.createSlice)({
    name: "contact",
    initialState,
    reducers: {
        updateMessage: (state, action) => {
            state.message = Object.assign(Object.assign({}, state.message), action.payload);
        },
    },
});
exports.updateMessage = exports.contactSlice.actions.updateMessage;
exports.default = exports.contactSlice.reducer;
//# sourceMappingURL=contactSlice.js.map