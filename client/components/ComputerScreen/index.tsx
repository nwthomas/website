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
        draggable={false}
        height={imageHeight}
        loading="eager"
        priority
        src={imageSrc}
        width={imageWidth}
      />
    </RootStyles>
  );
}

const RootStyles = styled.div`
  background-color: var(--color-white);
  border: var(--space-nano) solid var(--body-bg);
  border-radius: var(--border-radius-medium);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;

  /* Top bar on computer window */
  > div {
    align-items: center;
    background-color: var(--color-white);
    border-bottom: var(--space-nano) solid var(--body-bg);
    display: flex;
    height: var(--space-medium);
    padding-left: var(--space-xsmall);
    width: 100%;

    /* Top bar buttons */
    > div {
      border-radius: var(--border-radius-infinity);
      height: var(--space-small);
      margin-right: var(--space-xxsmall);
      width: var(--space-small);
    }

    > div:nth-child(1) {
      background-color: var(--color-burnt-sienna);
    }

    > div:nth-child(2) {
      background-color: var(--color-casablanca);
    }

    > div:nth-child(3) {
      background-color: var(--color-mantis);
    }
  }

  /* Image on computer screen - display: flex is to remove bottom spacing CSS adds */
  > image {
    display: flex;
  }
`;

export default ComputerScreen;
