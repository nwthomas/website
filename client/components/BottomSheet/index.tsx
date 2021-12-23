import * as React from "react";
import styled, { ThemeContext } from "styled-components";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { DARK_THEME } from "../../hooks/useGetPreferredTheme";
import { ThemeEnum } from "../../styles/libs/theme";

type Props = {
  content: (onButtonClick: () => void) => React.ReactElement;
  onBackgroundClick: () => void;
  onButtonClick: () => void;
};

function BottomSheet({ content, onBackgroundClick, onButtonClick }: Props) {
  const { currentTheme } = React.useContext(ThemeContext);

  // This hook automatically removes the scroll lock on modal unmount
  useLockBodyScroll();

  return (
    <RootStyles currentTheme={currentTheme} onClick={onBackgroundClick}>
      {content(onButtonClick)}
    </RootStyles>
  );
}

type StyleProps = {
  currentTheme: ThemeEnum;
};

const RootStyles = styled.div<StyleProps>`
  background-color: ${({ theme }) => `${theme.colorsHex.black}90`};
  display: flex;
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;

  > div {
    background-image: ${({ theme }) =>
      `linear-gradient(120deg, ${theme.colorsHex.cornFlowerBlue} 0%, ${theme.colorsHex.electricViolet} 100%)`};
    border-top-left-radius: ${({ theme }) => theme.borderRadii.xxLarge};
    border-top-right-radius: ${({ theme }) => theme.borderRadii.xxLarge};
    -webkit-box-shadow: ${({ currentTheme }) =>
      `0px 6px 19px -2px rgba(${
        currentTheme === DARK_THEME ? "255, 255, 255" : "0, 0, 0"
      }, 0.13)`};
    -moz-box-shadow: ${({ currentTheme }) =>
      `0px 6px 19px -2px rgba(${
        currentTheme === DARK_THEME ? "255, 255, 255" : "0, 0, 0"
      }, 0.13)`};
    box-shadow: ${({ currentTheme }) =>
      `0px 6px 19px -2px rgba(${
        currentTheme === DARK_THEME ? "255, 255, 255" : "0, 0, 0"
      }, 0.13)`};
    bottom: 0;
    padding: ${({ theme }) => theme.spaces.medium};
    position: absolute;
    width: 100%;
  }
`;

export default BottomSheet;
