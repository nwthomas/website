import * as React from "react";
import styled, { ThemeContext } from "styled-components";
import type { ThemeEnum } from "../../hooks/useGetPreferredTheme";

const DROPDOWN_MAX_WIDTH = 250;

interface Props {
  content: (onButtonClick: () => void) => React.ReactElement;
  onButtonClick: () => void;
  styles: {
    left: number;
    top: number;
  };
  rootRef: React.MutableRefObject<HTMLDivElement | null>;
}

function Dropdown({ content, onButtonClick, rootRef, styles }: Props) {
  const { left: leftCSSProperty, top: topCSSProperty } = styles;
  const { currentTheme } = React.useContext(ThemeContext);

  return (
    <RootStyles
      currentTheme={currentTheme}
      ref={rootRef}
      left={leftCSSProperty}
      top={topCSSProperty}
    >
      {content(onButtonClick)}
    </RootStyles>
  );
}

interface StyleProps {
  currentTheme: ThemeEnum;
  left: number;
  top: number;
}

const RootStyles = styled.div<StyleProps>`
  background-image: ${({ theme }) =>
    `linear-gradient(120deg, ${theme.colorsHex.cornFlowerBlue} 0%, ${theme.colorsHex.electricViolet} 100%)`};
  border-radius: ${({ theme }) => theme.borderRadii.xLarge};
  cursor: default;
  -webkit-box-shadow: ${({ theme }) => theme.dropshadows.small};
  -moz-box-shadow: ${({ theme }) => theme.dropshadows.small};
  box-shadow: ${({ theme }) => theme.dropshadows.small};
  padding: ${({ theme }) => theme.spaces.medium};
  position: absolute;
  left: ${({ left }) => `${left}px`};
  top: ${({ top }) => `${top}px`};
  max-width: ${DROPDOWN_MAX_WIDTH}px;
  width: 100%;
  z-index: 1;
`;

export default Dropdown;
