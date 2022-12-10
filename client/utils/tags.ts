export function buildAriaLabel(tagName: string): string {
  return `All articles about ${tagName}`;
}

export function buildTagIdParam(tagName: string): string {
  return tagName.split(" ").join("-").toLowerCase();
}

export function buildLinkHref(tagName: string): string {
  return `/tag/${buildTagIdParam(tagName)}`;
}
