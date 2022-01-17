import * as React from "react";
import styled, { ThemeContext } from "styled-components";
import { ThemeEnum } from "../../hooks/useGetPreferredTheme";

type Props = {
  content: (
    onConfirmClick: () => void,
    onCancelClick: () => void
  ) => React.ReactElement;
  onBackgroundClick: () => void;
  onConfirmClick: () => void;
};

function BottomSheet({ content, onBackgroundClick, onConfirmClick }: Props) {
  const { currentTheme } = React.useContext(ThemeContext);

  return (
    <RootStyles currentTheme={currentTheme} onClick={onBackgroundClick}>
      {content(onConfirmClick, onBackgroundClick)}
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
      `linear-gradient(120deg, ${theme.colorsHex.royalBlue} 0%, ${theme.colorsHex.pictonBlue} 100%)`};
    border-top-left-radius: ${({ theme }) => theme.borderRadii.xxLarge};
    border-top-right-radius: ${({ theme }) => theme.borderRadii.xxLarge};
    -webkit-box-shadow: ${({ theme }) => theme.dropshadows.small};
    -moz-box-shadow: ${({ theme }) => theme.dropshadows.small};
    box-shadow: ${({ theme }) => theme.dropshadows.small};
    bottom: 0;
    padding-bottom: ${({ theme }) => theme.spaces.large};
    padding-left: ${({ theme }) =>
      `calc(${theme.appDimensions.appHorizontalGutters} + ${theme.spaces.small})`};
    padding-right: ${({ theme }) =>
      `calc(${theme.appDimensions.appHorizontalGutters} + ${theme.spaces.small})`};
    padding-top: ${({ theme }) => theme.spaces.large};
    position: absolute;
    width: 100%;
  }
`;

export default BottomSheet;
