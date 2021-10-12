"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const middleware_1 = __importDefault(require("./middleware"));
const server = (0, express_1.default)();
(0, middleware_1.default)(server);
server.get("/", (_, res) => {
    res.status(200).send({
        message: "The server is currently online",
        success: true,
    });
});
server.post("/api/send-message", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, fax, message, name } = req.body;
    if (fax === null || fax === void 0 ? void 0 : fax.length) {
        return res.status(404).send({
            message: "The message could not be sent.",
            success: false,
        });
    }
    const transporter = nodemailer_1.default.createTransport({
        host: process.env.HOST_NAME,
        port: process.env.EMAIL_PORT,
        tls: process.env.TLS,
        auth: {
            user: process.env.USERNAME,
            pass: process.env.PASSWORD,
        },
    });
    const newEmail = {
        from: process.env.PERSONAL_EMAIL,
        to: process.env.PERSONAL_EMAIL,
        subject: `From ${name}`,
        text: `${email}\n\n${message}`,
    };
    const result = yield transporter.sendMail(newEmail);
    if ((_a = result === null || result === void 0 ? void 0 : result.accepted) === null || _a === void 0 ? void 0 : _a.length) {
        return res.status(200).send({
            message: "The message was sent successfully.",
            success: true,
        });
    }
    else {
        return res.status(502).send({
            message: "An error occurred while sending the message.",
            success: false,
        });
    }
}));
exports.default = server;
//# sourceMappingURL=server.js.map