"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./api/server"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 8000;
server_1.default.listen(port, () => console.log(`
  --------------------------------------------------------------
            Server is live on http://localhost:${port}
  --------------------------------------------------------------
    `));
//# sourceMappingURL=index.js.map