import * as React from "react";
import styled, { ThemeContext } from "styled-components";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { DARK_THEME } from "../../hooks/useGetPreferredTheme";
import { ThemeEnum } from "../../styles/libs/theme";

type Props = {
  content: {
    paragraphOne: string;
    paragraphTwo?: string;
    buttonLabel: string;
  };
  onBackgroundClick: () => void;
  onButtonClick: () => void;
};

function BottomSheet({ content, onBackgroundClick, onButtonClick }: Props) {
  const { currentTheme } = React.useContext(ThemeContext);

  // This hook automatically removes the scroll lock on modal unmount
  useLockBodyScroll();

  return (
    <RootStyles currentTheme={currentTheme} onClick={onBackgroundClick}>
      <div>
        <p>{content.paragraphOne}</p>
        {content?.paragraphTwo ? <p>{content.paragraphTwo}</p> : null}
        <button onClick={onButtonClick}>{content.buttonLabel}</button>
      </div>
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
  }
`;

export default BottomSheet;
