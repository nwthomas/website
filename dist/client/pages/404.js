"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Layout_1 = __importDefault(require("../components/Layout"));
const Error_1 = __importDefault(require("../components/Error"));
function FourOhFour() {
    return (<Layout_1.default pageName="Oops">
      <Error_1.default errorCode="404"/>
    </Layout_1.default>);
}
exports.default = FourOhFour;
//# sourceMappingURL=404.js.map