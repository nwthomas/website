import { colors, spaces, themeColorValues } from "../../styles/libs/theme";

const undefinedTheme = {
  'code[class*="language-"]': {
    fontSize: "14px",
    lineHeight: "1.375",
    direction: "ltr",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    MozTabSize: "4",
    OTabSize: "4",
    tabSize: "4",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
    background: themeColorValues.transparent,
    color: themeColorValues.text,
  },
  'pre[class*="language-"]': {
    fontSize: "14px",
    lineHeight: "1.375",
    direction: "ltr",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    MozTabSize: "4",
    OTabSize: "4",
    tabSize: "4",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
    background: themeColorValues.transparent,
    border: `${spaces.nano} solid ${themeColorValues.bodyBackgroundAccentTwo}`,
    color: themeColorValues.text,
    padding: "1em",
    margin: "0.5em 0",
    overflow: "auto",
  },
  'pre > code[class*="language-"]': {
    fontSize: "1em",
  },
  'pre[class*="language-"]::-moz-selection': {
    textShadow: "none",
    background: themeColorValues.text,
  },
  'pre[class*="language-"] ::-moz-selection': {
    textShadow: "none",
    background: themeColorValues.text,
  },
  'code[class*="language-"]::-moz-selection': {
    textShadow: "none",
    background: themeColorValues.text,
  },
  'code[class*="language-"] ::-moz-selection': {
    textShadow: "none",
    background: themeColorValues.text,
  },
  'pre[class*="language-"]::selection': {
    textShadow: "none",
    background: themeColorValues.text,
  },
  'pre[class*="language-"] ::selection': {
    textShadow: "none",
    background: themeColorValues.text,
  },
  'code[class*="language-"]::selection': {
    textShadow: "none",
    background: themeColorValues.text,
  },
  'code[class*="language-"] ::selection': {
    textShadow: "none",
    background: themeColorValues.text,
  },
  ':not(pre) > code[class*="language-"]': {
    padding: ".1em",
    borderRadius: ".3em",
  },
  comment: {
    color: themeColorValues.textSecondary,
  },
  prolog: {
    color: themeColorValues.textSecondary,
  },
  doctype: {
    color: themeColorValues.textSecondary,
  },
  cdata: {
    color: themeColorValues.textSecondary,
  },
  punctuation: {
    color: themeColorValues.textSecondary,
  },
  namespace: {
    Opacity: ".7",
  },
  tag: {
    color: colors.pictonBlue,
  },
  operator: {
    color: colors.pictonBlue,
  },
  number: {
    color: colors.pictonBlue,
  },
  property: {
    color: themeColorValues.text,
  },
  function: {
    color: colors.pictonBlue,
  },
  "tag-id": {
    color: themeColorValues.text,
  },
  selector: {
    color: themeColorValues.text,
  },
  "atrule-id": {
    color: themeColorValues.text,
  },
  "code.language-javascript": {
    color: colors.pictonBlue,
  },
  "attr-name": {
    color: colors.pictonBlue,
  },
  "code.language-css": {
    color: themeColorValues.textSecondary,
  },
  "code.language-scss": {
    color: themeColorValues.textSecondary,
  },
  boolean: {
    color: themeColorValues.textSecondary,
  },
  string: {
    color: themeColorValues.textSecondary,
  },
  entity: {
    color: themeColorValues.textSecondary,
    cursor: "help",
  },
  url: {
    color: themeColorValues.textSecondary,
  },
  ".language-css .token.string": {
    color: themeColorValues.textSecondary,
  },
  ".language-scss .token.string": {
    color: themeColorValues.textSecondary,
  },
  ".style .token.string": {
    color: themeColorValues.textSecondary,
  },
  "attr-value": {
    color: themeColorValues.textSecondary,
  },
  keyword: {
    color: themeColorValues.textSecondary,
  },
  control: {
    color: themeColorValues.textSecondary,
  },
  directive: {
    color: themeColorValues.textSecondary,
  },
  unit: {
    color: themeColorValues.textSecondary,
  },
  statement: {
    color: themeColorValues.textSecondary,
  },
  regex: {
    color: themeColorValues.textSecondary,
  },
  atrule: {
    color: themeColorValues.textSecondary,
  },
  placeholder: {
    color: themeColorValues.textSecondary,
  },
  variable: {
    color: themeColorValues.textSecondary,
  },
  deleted: {
    textDecoration: "line-through",
  },
  inserted: {
    borderBottom: `1px dotted ${themeColorValues.text}`,
    textDecoration: "none",
  },
  italic: {
    fontStyle: "italic",
  },
  important: {
    fontWeight: "bold",
    color: colors.pictonBlue,
  },
  bold: {
    fontWeight: "bold",
  },
  "pre > code.highlight": {
    Outline: `.4em solid ${themeColorValues.text}`,
    OutlineOffset: ".4em",
  },
  ".line-numbers.line-numbers .line-numbers-rows": {
    borderRightColor: "#2c2937",
  },
  ".line-numbers .line-numbers-rows > span:before": {
    color: "#3c3949",
  },
  ".line-highlight.line-highlight": {
    background:
      "linear-gradient(to right, rgba(224, 145, 66, 0.2) 70%, rgba(224, 145, 66, 0))",
  },
};

export default undefinedTheme;
