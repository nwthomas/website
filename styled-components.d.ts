import "styled-components";
import { Theme } from "./styles/libs/theme";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
