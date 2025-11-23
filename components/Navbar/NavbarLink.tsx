import * as React from "react";

import Link from "next/link";

interface Props {
  ariaLabel?: string;
  children: React.ReactNode | Array<React.ReactNode>;
  route: string;
}

function NavbarLink({ ariaLabel, children, route }: Props) {
  return (
    <div>
      <Link aria-label={ariaLabel} href={route} prefetch={false}>
        {children}
      </Link>
    </div>
  );
}

export default NavbarLink;
