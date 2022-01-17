import * as React from "react";
import styled, { ThemeContext } from "styled-components";
import Dropdown from "../Dropdown";
import BottomSheet from "../BottomSheet";
import { useGetScreenDimensions } from "../../hooks/useGetScreenDimensions";
import type { ScreenDimensions } from "../../hooks/useGetScreenDimensions";

const DROPDOWN_ANCHOR_GAP = 10;
const DROPDOWN_SCREEN_EDGE_GAP = 40;

interface Props {
  children: React.ReactElement;
  content: (
    onConfirmClick: () => void,
    onCancelClick: () => void
  ) => React.ReactElement;
  onDropdownButtonClick: () => void;
}

function DropdownAnchor({ children, content, onDropdownButtonClick }: Props) {
  const [showDropdown, setShowDropdown] = React.useState<boolean>(true);
  const [shouldHideVisibility, setShouldHideVisibility] =
    React.useState<boolean>(true);

  const screenDimensions = useGetScreenDimensions();

  const { breakpointsInt } = React.useContext(ThemeContext);
  const isNarrowViewport = !!(
    screenDimensions.viewportWidth &&
    screenDimensions.viewportWidth < breakpointsInt.tablet
  );

  const anchorRef = React.useRef<HTMLElement | null>(null);
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);

  // The defaults here are a placeholder until mount when the node is invisibly
  // mounted, measured, and repositioned for actual use
  const [refCoords, setRefCoords] = React.useState<DropdownCoordinates>({
    left: 0,
    top: 0,
  });
  const [dropdownMeasurements, setDropdownMeasurements] = React.useState<{
    height: number;
    width: number;
  }>({ height: 0, width: 0 });

  // Measure Dropdown on mount and then set passive scroll listener to measure placement
  function handleSetNewRefCoords() {
    if (
      typeof window !== "undefined" &&
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
    }
  }

  React.useEffect(() => {
    if (shouldHideVisibility) {
      handleSetNewRefCoords();
      setShowDropdown(false);
      setShouldHideVisibility(false);
    }
  }, [anchorRef.current, dropdownRef.current, screenDimensions]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleSetNewRefCoords, {
        passive: true,
      });

      return () => window.removeEventListener("scroll", handleSetNewRefCoords);
    }
  }, []);

  // Handle resizing of elements which may impact positioning of Dropdown
  React.useEffect(() => {
    handleSetNewRefCoords();
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

  const handleCloseDropdown = () => {
    setShowDropdown(false);
  };

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
            onConfirmClick={handleOnDropdownButtonClick}
            onCancelClick={handleCloseDropdown}
            rootRef={dropdownRef}
            styles={refCoords}
          />
        </DropdownRootStyles>
      ) : null}
      {shouldShowBottomSheet ? (
        <BottomSheet
          content={content}
          onBackgroundClick={handleCloseDropdown}
          onConfirmClick={handleOnDropdownButtonClick}
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
  leftRelative: number;
  top: number;
  topRelative: number;
  width: number;
}

function getHTMLNodeCoordinates(element: HTMLElement): HTMLCoordinates {
  const height = element.offsetHeight;
  const width = element.offsetWidth;

  const currentX = element.offsetTop;
  const currentY = element.offsetLeft;

  const { left: relativeY, top: relativeX } = element.getBoundingClientRect();

  return {
    height,
    left: currentY,
    leftRelative: relativeY,
    top: currentX,
    topRelative: relativeX,
    width,
  };
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
      leftRelative: anchorRelativeLeft,
      top: anchorTop,
      topRelative: anchorRelativeTop,
    } = getHTMLNodeCoordinates(anchorElement);
    const { height: dropdownHeight, width: dropdownWidth } =
      dropdownMeasurements;

    // Standardized measurements for placement booleans below
    const halfAnchorNodeWidth = anchorWidth / 2;
    // const halfAnchorNodeHeight = anchorHeight / 2;
    const halfDropdownWidth = dropdownWidth / 2;
    // const halfDropdownHeight = dropdownHeight / 2;
    const centeredDropdownPlacementLeft =
      anchorLeft + halfAnchorNodeWidth - halfDropdownWidth;

    // Placement booleans for decisions tree
    const isPlacementBelow =
      anchorRelativeTop + anchorHeight + DROPDOWN_ANCHOR_GAP + dropdownHeight <=
      availableViewportHeight;
    const isPlacementAbove =
      anchorRelativeTop - DROPDOWN_ANCHOR_GAP - dropdownHeight >= 0;
    const isPlacementLeft =
      anchorRelativeLeft + anchorWidth + DROPDOWN_ANCHOR_GAP >
      availableViewportWidth;
    const isPlacementRight = anchorRelativeLeft - DROPDOWN_ANCHOR_GAP < 0;

    const isPlacementLeftOffset =
      centeredDropdownPlacementLeft + dropdownWidth + DROPDOWN_SCREEN_EDGE_GAP >
      availableViewportWidth;
    const isPlacementRightOffset =
      centeredDropdownPlacementLeft - DROPDOWN_SCREEN_EDGE_GAP < 0;
    // const isPlacementBottomOffset =
    //   anchorTop +
    //     halfAnchorNodeHeight -
    //     halfDropdownHeight -
    //     DROPDOWN_ANCHOR_GAP <
    //   0;
    // const isPlacementTopOffset =
    //   anchorTop +
    //     halfAnchorNodeHeight +
    //     halfDropdownHeight +
    //     DROPDOWN_ANCHOR_GAP >
    //   availableViewportHeight;

    const belowPositionTop = anchorTop + anchorHeight + DROPDOWN_ANCHOR_GAP;
    const abovePositionTop = anchorTop - dropdownHeight - DROPDOWN_ANCHOR_GAP;

    // Handle above placement and to left
    if (
      isPlacementAbove &&
      !isPlacementBelow &&
      !isPlacementLeft &&
      isPlacementLeftOffset
    ) {
      dropdownCoordinates = {
        left: availableViewportWidth - DROPDOWN_SCREEN_EDGE_GAP - dropdownWidth,
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

    // // Handle left placement and up
    // else if (isPlacementLeft && isPlacementTopOffset) {
    //   dropdownCoordinates = {
    //     left: anchorLeft - dropdownWidth - DROPDOWN_ANCHOR_GAP,
    //     top: availableViewportHeight - DROPDOWN_ANCHOR_GAP - dropdownHeight,
    //   };
    // }

    // // Handle right placement and down
    // else if (isPlacementLeft && isPlacementBottomOffset) {
    //   dropdownCoordinates = {
    //     left: anchorLeft - dropdownWidth - DROPDOWN_ANCHOR_GAP,
    //     top: DROPDOWN_ANCHOR_GAP,
    //   };
    // }

    // // Handle right centered
    // else if (isPlacementLeft) {
    //   dropdownCoordinates = {
    //     left: anchorLeft - dropdownWidth - DROPDOWN_ANCHOR_GAP,
    //     top: anchorTop + halfAnchorNodeHeight - halfDropdownHeight,
    //   };
    // }

    // Handle right placement and up

    // Handle right placement and down

    // Handle right centered

    // Handle below placement and to left
    else if (isPlacementBelow && !isPlacementLeft && isPlacementLeftOffset) {
      dropdownCoordinates = {
        left: availableViewportWidth - DROPDOWN_SCREEN_EDGE_GAP - dropdownWidth,
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
