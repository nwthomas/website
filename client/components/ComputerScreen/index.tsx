import * as React from "react";

import Image from "next/image";
import styled from "styled-components";

interface Props {
  imageAlt?: string;
  imageHeight: number;
  imageSrc: string;
  imageWidth: number;
}

function ComputerScreen({
  imageAlt,
  imageHeight,
  imageSrc,
  imageWidth,
}: Props) {
  return (
    <RootStyles>
      <div>
        <div />
        <div />
        <div />
      </div>
      <Image
        alt={imageAlt || ""}
        blurDataURL={imageSrc}
        draggable={false}
        height={imageHeight}
        loading="eager"
        placeholder="blur"
        priority
        src={imageSrc}
        width={imageWidth}
      />
    </RootStyles>
  );
}

const RootStyles = styled.div`
  background-color: ${({ theme }) => theme.colorsHex.white};
  border: ${({ theme }) =>
    `${theme.spaces.nano} solid ${theme.colors.bodyBackgroundAccentOne}`};
  border-radius: ${({ theme }) => theme.borderRadii.medium};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;

  /* Top bar on computer window */
  > div {
    align-items: center;
    background-color: ${({ theme }) => theme.colorsHex.white};
    border-bottom: ${({ theme }) =>
      `${theme.spaces.nano} solid ${theme.colors.bodyBackgroundAccentOne}`};
    display: flex;
    height: ${({ theme }) => theme.spaces.medium};
    padding-left: ${({ theme }) => theme.spaces.xSmall};
    width: 100%;

    /* Top bar buttons */
    > div {
      border-radius: ${({ theme }) => theme.borderRadii.infinity};
      height: ${({ theme }) => theme.spaces.small};
      margin-right: ${({ theme }) => theme.spaces.xxSmall};
      width: ${({ theme }) => theme.spaces.small};
    }

    > div:nth-child(1) {
      background-color: ${({ theme }) => theme.colorsHex.burntSienna};
    }

    > div:nth-child(2) {
      background-color: ${({ theme }) => theme.colorsHex.casablanca};
    }

    > div:nth-child(3) {
      background-color: ${({ theme }) => theme.colorsHex.mantis};
    }
  }

  /* Image on computer screen - display: flex is to remove CSS bottom margin */
  > image {
    display: flex;
  }
`;

export default ComputerScreen;
