import FocusTrap from "focus-trap-react";
import React from "react";
import styled from "styled-components";

interface Props {
  // finish
}

function MobileNavbar(props: Props) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <RootStyles>
      <FocusTrap>
        <div />
      </FocusTrap>
    </RootStyles>
  );
}

const RootStyles = styled.div`
  width: 100%;
`;

export default MobileNavbar;
