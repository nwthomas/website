import styled from "styled-components";
import {
  DARK_THEME,
  useGetPreferredTheme,
} from "../../hooks/useGetPreferredTheme";
import { ThemeEnum } from "../../styles/libs/theme";

interface Props {
  currentTheme: ThemeEnum;
  onThemeChangeClick: () => void;
}

function ThemeTransitionSwitch({ currentTheme, onThemeChangeClick }: Props) {
  return (
    <>
      {currentTheme ? (
        <RootStyles
          isDarkMode={currentTheme === DARK_THEME}
          onClick={onThemeChangeClick}
        >
          <div />
        </RootStyles>
      ) : null}
    </>
  );
}

interface StyleProps {
  isDarkMode: boolean;
}

const RootStyles = styled.button<StyleProps>`
  background: ${({ theme }) => theme.colorsHex.white};
  border: 1px solid ${({ theme }) => theme.colors.bodyBackgroundOne};
  border-radius: ${({ theme }) => theme.borderRadii.infinity};
  cursor: pointer;
  height: 25px;
  position: relative;
  width: 50px;

  > div {
    background: ${({ theme }) => theme.colors.bodyBackgroundAccentTwo};
    border: 1px solid ${({ theme }) => theme.colorsHex.bodyBackgroundAccentOne};
    border-radius: ${({ theme }) => theme.borderRadii.infinity};
    height: 23px;
    position: absolute;
    left: 0;
    margin-left: ${({ isDarkMode }) => (isDarkMode ? "0px" : "24px")};
    transition: margin-left ${({ theme }) => theme.transitions.short}
      ease-in-out;
    top: 0;
    width: 23px;
  }
`;

export default ThemeTransitionSwitch;
