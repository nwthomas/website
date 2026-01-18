import Link from "next/link";
import { ReactNode } from "react";

export enum HeadingLevel {
  H1 = 1,
  H2 = 2,
  H3 = 3,
  H4 = 4,
  H5 = 5,
}

function getHeadingAndHeadingId(heading: string) {
  // Heading ID syntax in MDX should always follow this schema: [#the-id-goes-here]
  // A complete heading with it's following ID will take the shape of: "This is a Test Title [#this-is-a-test-id]"
  const match = heading.match(/\[#([^\]]+)\]/);
  if (!match) {
    return { heading, headingId: "" };
  }

  const headingId = match ? match[1] : "";
  const headingWithoutId = heading.replace(/\[#([^\]]+)\]/g, "").trim();

  return { heading: headingWithoutId, headingId };
}

export function getHeading(children: ReactNode, level: HeadingLevel): ReactNode {
  if (typeof children === 'string') {
    const { heading, headingId } = getHeadingAndHeadingId(children);
    let headingElement: ReactNode = children;
    if (level === HeadingLevel.H1) {
      headingElement = <h1 id={headingId}>{heading}</h1>;
    } else if (level === HeadingLevel.H2) {
      headingElement = <h2 id={headingId}>{heading}</h2>;
    } else if (level === HeadingLevel.H3) {
      headingElement = <h3 id={headingId}>{heading}</h3>;
    } else if (level === HeadingLevel.H4) {
      headingElement = <h4 id={headingId}>{heading}</h4>;
    } else if (level === HeadingLevel.H5) {
      headingElement = <h5 id={headingId}>{heading}</h5>;
    }
    
    if (!headingId) {
      return headingElement;
    }

    return (
      <Link className="inline-flex w-fit no-underline hover:opacity-100" href={`#${headingId}`}>
        {headingElement}
      </Link>
    );
  }
  
  return children;
}