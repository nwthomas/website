"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Dropdown_1 = __importDefault(require("../Dropdown"));
const getDropdownCoordinates = (element) => {
    const currentY = element.offsetHeight + element.offsetTop;
    const currentX = element.offsetWidth + element.offsetLeft;
    return { left: currentX, top: currentY };
};
function DropdownAnchor({ children, content, onDropdownButtonClick }) {
    const [showDropdown, setShowDropdown] = react_1.default.useState(false);
    const [refCoords, setRefCoords] = react_1.default.useState(null);
    const anchorRef = react_1.default.useRef(null);
    const dropdownRef = react_1.default.useRef(null);
    react_1.default.useEffect(() => {
        if (typeof window !== "undefined") {
            const handleResize = () => {
                if (anchorRef.current) {
                    const dropdownCoordinates = getDropdownCoordinates(anchorRef.current);
                    if (dropdownCoordinates.top !== (refCoords === null || refCoords === void 0 ? void 0 : refCoords.top) ||
                        dropdownCoordinates.left !== (refCoords === null || refCoords === void 0 ? void 0 : refCoords.top)) {
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
    react_1.default.useEffect(() => {
        if (typeof window !== "undefined") {
            const handleClickOutside = (event) => {
                if (anchorRef.current &&
                    dropdownRef.current &&
                    event.target instanceof Node &&
                    !anchorRef.current.contains(event.target) &&
                    !dropdownRef.current.contains(event.target)) {
                    setShowDropdown(false);
                }
            };
            if (showDropdown) {
                window.addEventListener("mousedown", handleClickOutside);
            }
            else {
                window.removeEventListener("mousedown", handleClickOutside);
            }
            return () => window.removeEventListener("mousedown", handleClickOutside);
        }
    }, [showDropdown]);
    const handleChildElementClick = (event) => {
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
    return (<react_1.default.Fragment>
      {react_1.default.cloneElement(children, {
            onClick: handleChildElementClick,
            ref: (element) => (anchorRef.current = element),
        })}
      {showDropdown && (refCoords === null || refCoords === void 0 ? void 0 : refCoords.left) && (refCoords === null || refCoords === void 0 ? void 0 : refCoords.top) ? (<Dropdown_1.default content={content} onButtonClick={handleOnDropdownButtonClick} rootRef={dropdownRef} styles={refCoords}/>) : null}
    </react_1.default.Fragment>);
}
exports.default = DropdownAnchor;
//# sourceMappingURL=index.js.map