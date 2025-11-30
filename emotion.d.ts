import "@emotion/react";
import { Theme as AppTheme } from "./styles/libs/theme";

declare module "@emotion/react" {
  export interface Theme extends AppTheme {}
}
