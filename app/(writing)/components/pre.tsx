import { sx } from "@/app/styles/tw.stylex";
import type { ReactNode } from "react";

export const Pre = ({
  children,
  scroll = true,
  caption = null,
}: {
  children: ReactNode;
  scroll: boolean;
  caption: ReactNode | null;
}) => (
  <div {...sx("wFull mb5 flex justifyCenter mx5 flexCol itemsCenter")}>
    <pre
      {...sx(
        "p4 textSm roundedSm bgNeutral200 textNeutral700 wFull maxW2xl",
        scroll ? "overflowAuto" : "whitespacePreWrap breakAll overflowHidden",
      )}
    >
      <code>{children}</code>
    </pre>
    <p {...sx("textSm mt2 textGray500")}>{caption}</p>
  </div>
);
