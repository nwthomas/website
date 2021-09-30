import { MutableRefObject } from "react";
import styled from "styled-components";

const DROPDOWN_MAX_WIDTH = 250;

const ARROW_HEIGHT = 5;
const ARROW_WIDTH = 10;

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
  rootRef: MutableRefObject<HTMLDivElement | null>;
}

function Dropdown({ content, onButtonClick, rootRef, styles }: Props) {
  const { left: leftCSSProperty, top: topCSSProperty } = styles;

  return (
    <RootStyles ref={rootRef} left={leftCSSProperty} top={topCSSProperty}>
      <p>{content.paragraphOne}</p>
      {content?.paragraphTwo ? <p>{content.paragraphTwo}</p> : null}
      <button onClick={onButtonClick}>{content.buttonLabel}</button>
    </RootStyles>
  );
}

interface StyleProps {
  left: number;
  top: number;
}

const RootStyles = styled.div<StyleProps>`
  background-image: linear-gradient(120deg, #8ec5fc 0%, #7579ff 100%);
  border-radius: ${({ theme }) => theme.borderRadii.xLarge};
  cursor: default;
  box-shadow: 0px 6px 10px -2px rgba(0, 0, 0, 0.47);
  -moz-box-shadow: 0px 6px 10px -2px rgba(0, 0, 0, 0.47);
  -webkit-box-shadow: 0px 6px 10px -2px rgba(0, 0, 0, 0.47);
  padding: ${({ theme }) => theme.spaces.medium};
  position: absolute;
  left: ${({ left }) => `${left - DROPDOWN_MAX_WIDTH + ARROW_WIDTH}px`};
  top: ${({ top }) => `${top + ARROW_HEIGHT}px`};
  max-width: ${DROPDOWN_MAX_WIDTH}px;
  width: 100%;
  z-index: 1;

  > p {
    font-size: 1.6rem;
    margin-bottom: ${({ theme }) => theme.spaces.medium};
    user-select: none;
  }

  > button {
    border: none;
    background: ${({ theme }) => theme.colors.buttonSecondaryBackground};
    border-radius: ${({ theme }) => theme.borderRadii.large};
    cursor: pointer;
    height: ${({ theme }) => theme.spaces.large};
    width: 100%;
  }
`;

export default Dropdown;
