import * as React from "react";
import styled, { ThemeContext } from "styled-components";
import { DARK_THEME } from "../../hooks/useGetPreferredTheme";
import type { ThemeEnum } from "../../styles/libs/theme";

const DROPDOWN_MAX_WIDTH = 250;

const ARROW_HEIGHT = 10;
const ARROW_WIDTH = 20;

interface Props {
  content: {
    paragraphOne: string;
    paragraphTwo?: string;
    buttonLabel: string;
  };
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
      <p>{content.paragraphOne}</p>
      {content?.paragraphTwo ? <p>{content.paragraphTwo}</p> : null}
      <button onClick={onButtonClick}>{content.buttonLabel}</button>
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
    `linear-gradient(120deg, ${theme.colorsHex.cornFlowerBlue}99 0%, ${theme.colorsHex.electricViolet}99 100%)`};
  border-radius: ${({ theme }) => theme.borderRadii.xLarge};
  cursor: default;
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
  padding: ${({ theme }) => theme.spaces.medium};
  position: absolute;
  left: ${({ left }) => `${left - DROPDOWN_MAX_WIDTH + ARROW_WIDTH}px`};
  top: ${({ top }) => `${top + ARROW_HEIGHT}px`};
  max-width: ${DROPDOWN_MAX_WIDTH}px;
  width: 100%;
  z-index: 1;

  > p {
    color: ${({ theme }) => theme.colorsHex.white};
    font-size: 1.6rem;
    margin-bottom: ${({ theme }) => theme.spaces.medium};
  }

  > button {
    border: none;
    background: ${({ theme }) => theme.colors.buttonSecondaryBackground};
    border-radius: ${({ theme }) => theme.borderRadii.large};
    color: ${({ theme }) => theme.colorsHex.white};
    cursor: pointer;
    height: ${({ theme }) => theme.spaces.large};
    width: 100%;
  }
`;

export default Dropdown;
