import styled from "styled-components";

interface Props {
  color: string;
  title?: string;
}

// Big thanks to Polywork for giving up the SVG file for this at:
// https://twitter.com/Polywork/status/1402023475741708299

function PolyworkIcon({ color, title }: Props) {
  return (
    <RootStyles
      color={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 250 250"
    >
      <title>{title || "Polywork icon"}</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 199.219V50.7813C0 22.6563 22.6562 0 50.7812 0H199.219C227.344 0 250 22.6563 250 50.7813V122.656C250 150.781 227.344 173.437 199.219 173.437H170.312V199.219C170.312 227.344 147.656 250 119.531 250H50.7812C22.6562 250 0 227.344 0 199.219ZM78.1249 78.9063H13.2812V50C13.2812 29.6875 29.6875 12.5 50.7812 12.5H78.1249V78.9063ZM199.219 160.937H171.875V93.7498H236.719V123.437C236.719 143.75 220.312 160.937 199.219 160.937ZM119.531 237.5H92.1871V175.781H157.031V200C157.031 220.312 140.625 237.5 119.531 237.5ZM92.1871 160.937H157.031V93.7498H92.1871V160.937ZM171.875 78.9063H236.719V50.7813C236.719 29.6875 219.531 13.2813 199.219 13.2813H171.875V78.9063ZM157.031 78.9063H92.1871V12.5H157.031V78.9063ZM12.5 175V199.219C12.5 220.312 29.6875 236.719 50 236.719H78.1249V175H12.5ZM78.1249 160.937H12.5V93.7498H78.1249V160.937Z"
      />
    </RootStyles>
  );
}

interface StyleProps {
  color?: string;
}

const RootStyles = styled.svg<StyleProps>`
  fill: ${({ color }) => color};
`;

export default PolyworkIcon;