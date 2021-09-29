import React, { ReactElement, SyntheticEvent } from "react";
import styled from "styled-components";
import Dropdown from "../Dropdown";

interface Props {
  children: ReactElement;
}

interface DropdownCoordinates {
  left: number;
  top: number;
}

const getDropdownCoordinates = (element: HTMLElement): DropdownCoordinates => {
  const currentY = element.offsetHeight + element.offsetTop;
  const currentX = element.offsetWidth / 2 + element.offsetLeft;

  return { left: currentX, top: currentY };
};

function DropdownAnchor({ children }: Props) {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [refCoords, setRefCoords] = React.useState<DropdownCoordinates | null>(
    null
  );
  const childRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (childRef.current) {
      const dropdownCoordinates = getDropdownCoordinates(childRef.current);

      if (
        dropdownCoordinates.top !== refCoords?.top ||
        dropdownCoordinates.left !== refCoords?.top
      ) {
        setRefCoords(dropdownCoordinates);
      }
    }
  }, [childRef.current]);

  const handleChildElementClick = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (childRef.current) {
      const dropdownCoordinates = getDropdownCoordinates(childRef.current);

      setShowDropdown(!showDropdown);
      setRefCoords(dropdownCoordinates);
    }
  };

  return (
    <React.Fragment>
      {React.cloneElement(children, {
        onClick: handleChildElementClick,
        ref: (element: HTMLElement) => (childRef.current = element),
      })}
      {showDropdown && refCoords?.left && refCoords?.top ? (
        <Dropdown styles={refCoords} />
      ) : null}
    </React.Fragment>
  );
}

export default DropdownAnchor;
