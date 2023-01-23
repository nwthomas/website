import React from "react";
import styled from "styled-components";

function BabyYodaEasterEgg() {
  return (
    <RootStyles>
      <div>
        <img
          alt="Baby Yoda"
          draggable={false}
          height={512}
          src="/baby-yoda.webp"
          width={491}
        />
      </div>
    </RootStyles>
  );
}

const RootStyles = styled.div`
  display: none;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.desktop}) {
    bottom: 0;
    display: flex;
    height: 150px;
    right: 0;
    overflow: hidden;
    position: absolute;
    width: 150px;
    z-index: 1;

    > div {
      transition: ${({ theme }) => theme.transitions.long} ease-in-out;
      transform: rotate(-30deg) translate(0px, 180px);
      user-select: none;
    }

    &:hover {
      > div {
        transform: rotate(-30deg) translate(10px, 35px);
      }
    }
  }
`;

export default BabyYodaEasterEgg;
