"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const VALID_DOMAIN_LIST = [`localhost:3000`, "nathanthomas.dev"];
function isValidDomain(req, res, next) {
    if (VALID_DOMAIN_LIST.includes(req.get("host"))) {
        next();
    }
    else {
        return res.status(421).send({
            message: "The request is not allowed.",
            success: false,
        });
    }
}
exports.default = (server) => {
    server.use(express_1.default.json());
    server.use((0, cors_1.default)());
    server.use((0, helmet_1.default)());
    server.use((0, morgan_1.default)("tiny"));
    server.use(isValidDomain);
};
//# sourceMappingURL=middleware.js.map