import styled from "styled-components";

const DROPDOWN_HEIGHT = 250;
const DROPDOWN_WIDTH = 250;

const ARROW_HEIGHT = 15;
const ARROW_WIDTH = 30;

interface Props {
  styles: {
    left: number;
    top: number;
  };
}

function Dropdown({ styles }: Props) {
  const { left, top } = styles;

  return (
    <RootStyles left={left} top={top}>
      <div />
    </RootStyles>
  );
}

interface StyleProps {
  left: number;
  top: number;
}

const RootStyles = styled.div<StyleProps>`
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
  border-radius: ${({ theme }) => theme.borderRadii.large};
  height: ${DROPDOWN_HEIGHT}px;
  position: fixed;
  left: ${({ left }) => `${left - DROPDOWN_WIDTH + ARROW_WIDTH}px`};
  top: ${({ top }) => `${top + ARROW_HEIGHT}px`};
  min-width: ${DROPDOWN_WIDTH}px;
  z-index: 1;
  -webkit-box-shadow: 0px 6px 10px -2px rgba(0, 0, 0, 0.47);
  -moz-box-shadow: 0px 6px 10px -2px rgba(0, 0, 0, 0.47);
  box-shadow: 0px 6px 10px -2px rgba(0, 0, 0, 0.47);
`;

export default Dropdown;
