import styled from "styled-components";

interface Props {
  color: string;
  isAriaHidden?: boolean;
  title?: string;
}

function ArrowForwardsIcon({ color, isAriaHidden, title }: Props) {
  return (
    <RootStyles aria-hidden={isAriaHidden} $color={color} viewBox="0 0 512 512">
      <title>{title || "Arrow Forwards"}</title>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="48"
        d="M268 112l144 144-144 144M392 256H100"
      />
    </RootStyles>
  );
}

interface StyleProps {
  $color: string;
}

const RootStyles = styled.svg<StyleProps>`
  stroke: ${({ $color }) => $color};
`;

export default ArrowForwardsIcon;
