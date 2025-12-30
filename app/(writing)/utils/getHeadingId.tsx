export function getHeadingAndHeadingId(heading: string) {
  // Heading ID syntax in MDX should always follow this schema: [#the-id-goes-here]
  const match = heading.match(/#\[(.*?)\]/);
  const headingId = match ? match[1] : "";
  const headingWithoutId = heading.replace(/#\[(.*?)\]/g, "");

  return { heading: headingWithoutId, headingId };
}
