export const NEW_TAB_HINT = "(opens in a new tab)";

export function withNewTabHint(label: string) {
  return `${label} ${NEW_TAB_HINT}`;
}
