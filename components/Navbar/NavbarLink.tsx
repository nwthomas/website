import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  ariaLabel?: string;
  children: ReactNode | Array<ReactNode>;
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
