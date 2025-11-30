import styled from "@emotion/styled";

interface Props {
  color: string;
  isAriaHidden?: boolean;
  title?: string;
}

function CloseIcon({ color, isAriaHidden, title }: Props) {
  return (
    <RootStyles aria-hidden={isAriaHidden} color={color} viewBox="0 0 512 512">
      <title>{title || "Close"}</title>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="70"
        d="M368 368L144 144M368 144L144 368"
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

export default CloseIcon;
