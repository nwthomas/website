export function buildKebabCaseParam(tagName: string): string {
  return tagName.split(" ").join("-").toLowerCase();
}

export function buildLinkHref(tagName: string): string {
  return `/tag/${buildKebabCaseParam(tagName)}`;
}
