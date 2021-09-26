import React from "react";
import Image from "next/image";
import styled from "styled-components";

export default function BabyYodaEasterEgg() {
  return (
    <RootStyles>
      <div>
        <Image
          alt="Baby Yoda"
          draggable={false}
          height={512}
          quality={100}
          src="/baby-yoda.png"
          width={491}
        />
      </div>
    </RootStyles>
  );
}

const RootStyles = styled.div`
  display: none;

  @media only screen and (min-width: 600px) {
    bottom: 0;
    display: flex;
    height: 150px;
    left: 0;
    overflow: hidden;
    position: absolute;
    width: 150px;

    > div {
      transition: ${({ theme }) => theme.transitions.xLong} ease-in-out;
      transform: rotate(30deg) translate(0px, 180px);
      user-select: none;
    }

    &:hover {
      > div {
        transform: rotate(30deg) translate(-6px, 35px);
      }
    }
  }
`;
