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
const React = __importStar(require("react"));
const styled_components_1 = __importStar(require("styled-components"));
function Spinner(props) {
    const bars = React.useMemo(() => {
        const bars = [];
        for (let i = 0; i < 12; i++) {
            bars.push(<div style={{
                    animationDelay: (i - 12) / 10 + "s",
                    transform: "rotate(" + i * 30 + "deg) translate(146%)",
                    WebkitAnimationDelay: (i - 12) / 10 + "s",
                    WebkitTransform: "rotate(" + i * 30 + "deg) translate(146%)",
                }} key={i}/>);
        }
        return bars;
    }, []);
    return <RootStyles {...props}>{bars}</RootStyles>;
}
const spinnerAnimation = (0, styled_components_1.keyframes) `
  0% { opacity: 1; };
  100% { opacity: 0.15; };
`;
const RootStyles = styled_components_1.default.div `
  display: flex;
  height: ${({ height }) => height};
  position: relative;
  width: ${({ width }) => width};

  > div {
    animation: ${spinnerAnimation} 1.2s linear infinite;
    -moz-animation: ${spinnerAnimation} 1.2s linear infinite;
    -webkit-animation: ${spinnerAnimation} 1.2s linear infinite;
    border-radius: 5px;
    background-color: ${({ color }) => color};
    height: 7.8%;
    left: 40%;
    position: absolute;
    top: 46.1%;
    width: 20%;
  }
`;
exports.default = Spinner;
//# sourceMappingURL=index.js.map