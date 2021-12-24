import * as React from "react";
import styled, { ThemeContext } from "styled-components";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { ThemeEnum } from "../../hooks/useGetPreferredTheme";

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
    -webkit-box-shadow: ${({ theme }) => theme.dropshadows.small};
    -moz-box-shadow: ${({ theme }) => theme.dropshadows.small};
    box-shadow: ${({ theme }) => theme.dropshadows.small};
    bottom: 0;
    padding-bottom: ${({ theme }) => theme.spaces.medium};
    padding-left: ${({ theme }) => theme.appDimensions.appHorizontalGutters};
    padding-right: ${({ theme }) => theme.appDimensions.appHorizontalGutters};
    padding-top: ${({ theme }) => theme.spaces.medium};
    position: absolute;
    width: 100%;
  }
`;

export default BottomSheet;
