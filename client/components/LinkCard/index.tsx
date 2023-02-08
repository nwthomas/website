import * as React from "react";

import Link from "next/link";
import styled from "styled-components";

interface Props {
  ariaLabel?: string;
  href: string;
  icon: React.ReactNode;
  label: string;
}

function LinkCard({ ariaLabel, href, icon, label }: Props) {
  return (
    <Link aria-label={ariaLabel} href={href}>
      <RootStyles>
        <div>
          {icon}
          <p>{label}</p>
        </div>
      </RootStyles>
    </Link>
  );
}

const RootStyles = styled.div`
  // finish
`;

export default LinkCard;
