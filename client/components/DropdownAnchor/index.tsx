import * as React from "react";
import styled, { ThemeContext } from "styled-components";
import Dropdown from "../Dropdown";
import BottomSheet from "../BottomSheet";
import { useGetScreenDimensions } from "../../hooks/useGetScreenDimensions";
import type { ScreenDimensions } from "../../hooks/useGetScreenDimensions";

const DROPDOWN_VERTICAL_GAP = 10;
const DROPDOWN_HORIZONTAL_GAP = 40;

interface Props {
  children: React.ReactElement;
  content: (onButtonClick: () => void) => React.ReactElement;
  onDropdownButtonClick: () => void;
}

function DropdownAnchor({ children, content, onDropdownButtonClick }: Props) {
  const [showDropdown, setShowDropdown] = React.useState<boolean>(true);
  const [shouldHideVisibility, setShouldHideVisibility] =
    React.useState<boolean>(true);

  const { breakpointsInt } = React.useContext(ThemeContext);

  const anchorRef = React.useRef<HTMLElement | null>(null);
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);

  const screenDimensions = useGetScreenDimensions();

  // The defaults here are a placeholder until mount when the node is invisibly
  // mounted, measured, and repositioned
  const [refCoords, setRefCoords] = React.useState<DropdownCoordinates>({
    left: 0,
    top: 0,
  });
  const [dropdownMeasurements, setDropdownMeasurements] = React.useState<{
    height: number;
    width: number;
  }>({ height: 0, width: 0 });

  // Measure Dropdown on mount and screen dimensions changes
  React.useEffect(() => {
    if (
      typeof window !== "undefined" &&
      shouldHideVisibility &&
      anchorRef.current &&
      dropdownRef.current &&
      screenDimensions?.availableHeight &&
      screenDimensions?.availableWidth
    ) {
      const { height, width } = getHTMLNodeCoordinates(dropdownRef.current);
      setDropdownMeasurements({ height, width });

      const { left, top } = getDropdownCoordinates(
        anchorRef.current,
        { height, width },
        screenDimensions
      );
      setRefCoords({ left, top });

      setShowDropdown(false);
      setShouldHideVisibility(false);
    }
  }, [anchorRef.current, dropdownRef.current, screenDimensions]);

  // Handle resizing of elements which may impact positioning of Dropdown
  React.useEffect(() => {
    if (
      typeof window !== "undefined" &&
      anchorRef.current &&
      screenDimensions?.availableHeight &&
      screenDimensions?.availableWidth
    ) {
      const dropdownCoordinates = getDropdownCoordinates(
        anchorRef.current,
        dropdownMeasurements,
        screenDimensions
      );

      setRefCoords(dropdownCoordinates);
    }
  }, [
    dropdownMeasurements,
    screenDimensions?.availableHeight,
    screenDimensions?.availableWidth,
  ]);

  // Handle changes in Dropdown height/width
  React.useEffect(() => {
    if (dropdownRef.current) {
      const { height, width } = getHTMLNodeCoordinates(dropdownRef.current);
      setDropdownMeasurements({ height, width });
    }
  }, [dropdownRef.current?.offsetHeight, dropdownRef.current?.offsetWidth]);

  // Handle setting and removing click handler for clicks outside Dropdown
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

  // Handle click on DropdownAnchor element (the child, in this case)
  const handleChildElementClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (anchorRef.current) {
      const dropdownCoordinates = getDropdownCoordinates(
        anchorRef.current,
        dropdownMeasurements,
        screenDimensions
      );

      setRefCoords(dropdownCoordinates);
      setShowDropdown(!showDropdown);
    }
  };

  const handleOnDropdownButtonClick = () => {
    setShowDropdown(!showDropdown);
    onDropdownButtonClick();
  };

  const handleOnBottomSheetBackgroundClick = () => {
    setShowDropdown(false);
  };

  const isNarrowViewport = !!(
    screenDimensions.viewportWidth &&
    screenDimensions.viewportWidth < breakpointsInt.tablet
  );

  const shouldShowDropdown =
    showDropdown && (shouldHideVisibility || !isNarrowViewport);
  const shouldShowBottomSheet =
    showDropdown && !shouldHideVisibility && isNarrowViewport;

  return (
    <React.Fragment>
      {React.cloneElement(children, {
        onClick: handleChildElementClick,
        ref: (element: HTMLElement) => (anchorRef.current = element),
      })}
      {shouldShowDropdown ? (
        <DropdownRootStyles isVisibilityHidden={shouldHideVisibility}>
          <Dropdown
            content={content}
            onButtonClick={handleOnDropdownButtonClick}
            rootRef={dropdownRef}
            styles={refCoords}
          />
        </DropdownRootStyles>
      ) : null}
      {shouldShowBottomSheet ? (
        <BottomSheet
          content={content}
          onBackgroundClick={handleOnBottomSheetBackgroundClick}
          onButtonClick={handleOnDropdownButtonClick}
        />
      ) : null}
    </React.Fragment>
  );
}

type DropdownStyleProps = {
  isVisibilityHidden: boolean;
};

const DropdownRootStyles = styled.div<DropdownStyleProps>`
  visibility: ${({ isVisibilityHidden }) =>
    isVisibilityHidden ? "hidden" : "visible"};
`;

/**
 * UTILITY FUNCTIONS
 */

// Get all necessary measurements of any HTML single element
interface HTMLCoordinates {
  height: number;
  left: number;
  top: number;
  width: number;
}

function getHTMLNodeCoordinates(element: HTMLElement): HTMLCoordinates {
  const height = element.offsetHeight;
  const width = element.offsetWidth;
  const currentY = element.offsetTop;
  const currentX = element.offsetLeft;

  return { height, left: currentX, top: currentY, width };
}

// Get the exact placement of the dropdown relative to the anchor node and viewport
interface DropdownCoordinates {
  left: number;
  top: number;
}

function getDropdownCoordinates(
  anchorElement: HTMLElement,
  dropdownMeasurements: { height: number; width: number },
  viewportCoords: ScreenDimensions
): DropdownCoordinates {
  let dropdownCoordinates = { left: 0, top: 0 };

  if (viewportCoords?.availableHeight && viewportCoords?.availableWidth) {
    const {
      availableHeight: availableViewportHeight,
      availableWidth: availableViewportWidth,
    } = viewportCoords;
    const {
      height: anchorHeight,
      width: anchorWidth,
      left: anchorLeft,
      top: anchorTop,
    } = getHTMLNodeCoordinates(anchorElement);
    const { height: dropdownHeight, width: dropdownWidth } =
      dropdownMeasurements;

    // Standardized measurements for placement booleans below
    const halfAnchorNodeWidth = anchorWidth / 2;
    const halfDropdownWidth = dropdownWidth / 2;
    const centeredDropdownPlacementLeft =
      anchorLeft + halfAnchorNodeWidth - halfDropdownWidth;

    // Placement booleans for decisions tree
    const isPlacementBelow =
      anchorTop + anchorHeight + DROPDOWN_VERTICAL_GAP + dropdownHeight <=
      availableViewportHeight;
    const isPlacementAbove =
      anchorTop - DROPDOWN_VERTICAL_GAP - dropdownHeight >= 0;
    const isPlacementLeft =
      anchorLeft + anchorWidth + DROPDOWN_VERTICAL_GAP > availableViewportWidth;
    const isPlacementRight = anchorLeft - DROPDOWN_VERTICAL_GAP < 0;

    const isPlacementLeftOffset =
      centeredDropdownPlacementLeft + dropdownWidth + DROPDOWN_HORIZONTAL_GAP >
      availableViewportWidth;
    const isPlacementRightOffset =
      centeredDropdownPlacementLeft - DROPDOWN_HORIZONTAL_GAP < 0;

    const belowPositionTop = anchorTop + anchorHeight + DROPDOWN_VERTICAL_GAP;
    const abovePositionTop = anchorTop - dropdownHeight - DROPDOWN_VERTICAL_GAP;

    // Handle above placement and to left
    if (
      isPlacementAbove &&
      !isPlacementBelow &&
      !isPlacementLeft &&
      isPlacementLeftOffset
    ) {
      dropdownCoordinates = {
        left: availableViewportWidth - DROPDOWN_HORIZONTAL_GAP - dropdownWidth,
        top: abovePositionTop,
      };
    }

    // Handle above placement and to right
    else if (
      isPlacementAbove &&
      !isPlacementBelow &&
      !isPlacementRight &&
      isPlacementRightOffset
    ) {
      dropdownCoordinates = {
        left: anchorLeft + anchorWidth - dropdownWidth,
        top: abovePositionTop,
      };
    }

    // Handle above centered
    else if (
      isPlacementAbove &&
      !isPlacementBelow &&
      !isPlacementLeftOffset &&
      !isPlacementRightOffset
    ) {
      dropdownCoordinates = {
        left: anchorLeft + halfAnchorNodeWidth - halfDropdownWidth,
        top: abovePositionTop,
      };
    }

    // Handle below placement and to left
    else if (isPlacementBelow && !isPlacementLeft && isPlacementLeftOffset) {
      dropdownCoordinates = {
        left: availableViewportWidth - DROPDOWN_HORIZONTAL_GAP - dropdownWidth,
        top: belowPositionTop,
      };
    }

    // Handle below placement and to right
    else if (isPlacementBelow && !isPlacementRight && isPlacementRightOffset) {
      dropdownCoordinates = {
        left: anchorLeft + anchorWidth - dropdownWidth,
        top: belowPositionTop,
      };
    }

    // else fallback + below centered
    else {
      dropdownCoordinates = {
        left: anchorLeft + halfAnchorNodeWidth - halfDropdownWidth,
        top: belowPositionTop,
      };
    }
  }

  return dropdownCoordinates;
}

export default DropdownAnchor;
