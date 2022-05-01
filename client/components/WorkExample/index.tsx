import Image from "next/image";
import styled from "styled-components";

type Props = {
  ariaLabel: string;
  imageDimensions: {
    height: number;
    width: number;
  };
  imageAlt: string;
  imageSrc: string;
  title: string;
  url: string;
};

function WorkExample({
  ariaLabel,
  imageDimensions: { height, width },
  imageAlt,
  imageSrc,
  title,
  url,
}: Props) {
  return (
    <RootStyles
      href={url}
      aria-label={ariaLabel}
      rel="noopener noreferrer"
      target="_target"
    >
      <Image
        alt={imageAlt || "Image"}
        quality={50}
        priority
        src={imageSrc}
        height={height}
        width={width}
      />
      <h2>{title}</h2>
    </RootStyles>
  );
}

const RootStyles = styled.a`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: transform ${({ theme }) => theme.transitions.medium} ease-in-out,
    opacity ${({ theme }) => theme.transitions.medium} ease-in-out;
  width: 100%;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.ultraWide}) {
    max-width: 700px;
  }

  > h2 {
    margin-top: ${({ theme }) => theme.spaces.medium};
    text-align: center;
  }

  &:hover {
    opacity: ${({ theme }) => theme.opacity.opacity70};
    transform: translateY(-3px);
  }
`;

export default WorkExample;
