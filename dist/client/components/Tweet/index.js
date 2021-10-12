"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const styled_components_1 = __importDefault(require("styled-components"));
function Tweet({ currentTheme, tweetId }) {
    const [isLoaded, setIsLoading] = (0, react_1.useState)(false);
    // The first pass needs to use the <blockquote /> and <a /> tag by calling the script load()
    // method which scans the DOM. Subsequent "re-renders" will manually remove children (on the
    // change of the currentTheme prop) and manually create a new Tweet.
    (0, react_1.useEffect)(() => {
        var _a, _b, _c;
        if (typeof window !== "undefined" &&
            !((_a = window === null || window === void 0 ? void 0 : window.twttr) === null || _a === void 0 ? void 0 : _a.init) &&
            ((_c = (_b = window === null || window === void 0 ? void 0 : window.twttr) === null || _b === void 0 ? void 0 : _b.widgets) === null || _c === void 0 ? void 0 : _c.load)) {
            window.twttr.widgets.load();
            setIsLoading(true);
        }
    }, []);
    (0, react_1.useEffect)(() => {
        var _a, _b, _c, _d;
        if (typeof window !== "undefined" &&
            ((_a = window === null || window === void 0 ? void 0 : window.twttr) === null || _a === void 0 ? void 0 : _a.init) &&
            ((_b = window === null || window === void 0 ? void 0 : window.twttr) === null || _b === void 0 ? void 0 : _b.widgets.load) &&
            ((_d = (_c = window === null || window === void 0 ? void 0 : window.twttr) === null || _c === void 0 ? void 0 : _c.widgets) === null || _d === void 0 ? void 0 : _d.createTweet)) {
            if (!isLoaded) {
                window.twttr.widgets.load();
                setIsLoading(true);
            }
            else {
                const tweetContainerElement = document.getElementById("container");
                if (tweetContainerElement === null || tweetContainerElement === void 0 ? void 0 : tweetContainerElement.firstChild) {
                    while (tweetContainerElement.firstChild) {
                        tweetContainerElement.removeChild(tweetContainerElement.firstChild);
                    }
                    const tweetRootElement = document.createElement("div");
                    tweetRootElement.setAttribute("id", "tweet");
                    tweetContainerElement.appendChild(tweetRootElement);
                    createTweet(tweetId, tweetRootElement, {
                        conversation: "none",
                        dnt: true,
                        lang: "en",
                        theme: currentTheme,
                    });
                }
            }
        }
    }, [currentTheme, isLoaded, tweetId]);
    return (<RootStyles>
      <h2>Latest Tweet</h2>
      <div id="container">
        <blockquote className="twitter-tweet" data-dnt data-theme={currentTheme} data-conversation="none" data-lang="en">
          <a href={`https://twitter.com/nwthomas_/status/${tweetId}`}></a>
        </blockquote>
      </div>
    </RootStyles>);
}
function createTweet(tweetId, element, options) {
    var _a, _b;
    if (typeof window !== "undefined" && ((_b = (_a = window === null || window === void 0 ? void 0 : window.twttr) === null || _a === void 0 ? void 0 : _a.widgets) === null || _b === void 0 ? void 0 : _b.createTweet)) {
        window.twttr.widgets.createTweet(tweetId, element, options);
    }
}
const RootStyles = styled_components_1.default.div `
  > h2 {
    padding-bottom: ${({ theme }) => theme.spaces.small};
  }
`;
exports.default = Tweet;
//# sourceMappingURL=index.js.map