"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
function BabyYodaEasterEgg() {
    return (<RootStyles>
      <div>
        <img alt="Baby Yoda" draggable={false} height={512} src="/baby-yoda.png" width={491}/>
      </div>
    </RootStyles>);
}
exports.default = BabyYodaEasterEgg;
const RootStyles = styled_components_1.default.div `
  display: none;

  @media only screen and (min-width: 600px) {
    bottom: 0;
    display: flex;
    height: 150px;
    right: 0;
    overflow: hidden;
    position: absolute;
    width: 150px;

    > div {
      transition: ${({ theme }) => theme.transitions.long} ease-in-out;
      transform: rotate(-30deg) translate(0px, 180px);
      user-select: none;
    }

    &:hover {
      > div {
        transform: rotate(-30deg) translate(10px, 35px);
      }
    }
  }
`;
//# sourceMappingURL=index.js.map