import * as React from "react";

import styled, { keyframes } from "styled-components";

// This file is an adaptation from an old (and abandoned) zero-config spinner repo
// found at https://github.com/chenglou/react-spinner/blob/master/index.jsx

interface Props {
  color: string;
  height: string;
  width: string;
}

function Spinner(props: Props) {
  const bars = React.useMemo(() => {
    const bars: Array<JSX.Element> = [];

    for (let i = 0; i < 12; i++) {
      bars.push(
        <div
          style={{
            animationDelay: (i - 12) / 10 + "s",
            transform: "rotate(" + i * 30 + "deg) translate(146%)",
            WebkitAnimationDelay: (i - 12) / 10 + "s",
            WebkitTransform: "rotate(" + i * 30 + "deg) translate(146%)",
          }}
          key={i}
        />,
      );
    }

    return bars;
  }, []);

  return <RootStyles {...props}>{bars}</RootStyles>;
}

interface StyleProps {
  color: string;
  height: string;
  width: string;
}

const spinnerAnimation = keyframes`
  0% { opacity: 1; };
  100% { opacity: 0.15; };
`;

const RootStyles = styled.div<StyleProps>`
  display: flex;
  height: ${({ height }) => height};
  position: relative;
  width: ${({ width }) => width};

  > div {
    animation: ${spinnerAnimation} 1.2s linear infinite;
    -moz-animation: ${spinnerAnimation} 1.2s linear infinite;
    -webkit-animation: ${spinnerAnimation} 1.2s linear infinite;
    border-radius: 5px;
    background-color: ${({ color }) => color};
    height: 7.8%;
    left: 40%;
    position: absolute;
    top: 46.1%;
    width: 20%;
  }
`;

export default Spinner;
