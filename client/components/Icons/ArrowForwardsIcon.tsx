import styled from "styled-components";

interface Props {
  color: string;
  title?: string;
}

function ArrowForwardsIcon({ color, title }: Props) {
  return (
    <RootStyles
      xmlns="http://www.w3.org/2000/svg"
      color={color}
      viewBox="0 0 512 512"
    >
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
  color: string;
}

const RootStyles = styled.svg<StyleProps>`
  stroke: ${({ color }) => color};
`;

export default ArrowForwardsIcon;
