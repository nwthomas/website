import React, { ReactElement, SyntheticEvent } from "react";
import Dropdown from "../Dropdown";

interface Props {
  children: ReactElement;
  content: {
    paragraphOne: string;
    paragraphTwo?: string;
    buttonLabel: string;
  };
  onDropdownButtonClick: () => void;
}

interface DropdownCoordinates {
  left: number;
  top: number;
}

const getDropdownCoordinates = (element: HTMLElement): DropdownCoordinates => {
  const currentY = element.offsetHeight + element.offsetTop;
  const currentX = element.offsetWidth + element.offsetLeft;

  return { left: currentX, top: currentY };
};

function DropdownAnchor({ children, content, onDropdownButtonClick }: Props) {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [refCoords, setRefCoords] = React.useState<DropdownCoordinates | null>(
    null
  );
  const anchorRef = React.useRef<HTMLElement | null>(null);
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        if (anchorRef.current) {
          const dropdownCoordinates = getDropdownCoordinates(anchorRef.current);

          if (
            dropdownCoordinates.top !== refCoords?.top ||
            dropdownCoordinates.left !== refCoords?.top
          ) {
            setRefCoords(dropdownCoordinates);
          }
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const handleClickOutside = (event: Event) => {
        if (
          anchorRef.current &&
          dropdownRef.current &&
          event.target instanceof Node &&
          !anchorRef.current.contains(event.target) &&
          !dropdownRef.current.contains(event.target)
        ) {
          setShowDropdown(false);
        }
      };

      if (showDropdown) {
        window.addEventListener("mousedown", handleClickOutside);
      } else {
        window.removeEventListener("mousedown", handleClickOutside);
      }

      return () => window.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showDropdown]);

  const handleChildElementClick = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (anchorRef.current) {
      const dropdownCoordinates = getDropdownCoordinates(anchorRef.current);

      setShowDropdown(!showDropdown);
      setRefCoords(dropdownCoordinates);
    }
  };

  const handleOnDropdownButtonClick = () => {
    setShowDropdown(!showDropdown);
    onDropdownButtonClick();
  };

  return (
    <React.Fragment>
      {React.cloneElement(children, {
        onClick: handleChildElementClick,
        ref: (element: HTMLElement) => (anchorRef.current = element),
      })}
      {showDropdown && refCoords?.left && refCoords?.top ? (
        <Dropdown
          content={content}
          onButtonClick={handleOnDropdownButtonClick}
          rootRef={dropdownRef}
          styles={refCoords}
        />
      ) : null}
    </React.Fragment>
  );
}

export default DropdownAnchor;
