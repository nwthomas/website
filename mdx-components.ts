// TODO: Import custom components here

export function useMDXComponents(components: { [component: string]: React.ComponentType }) {
  return {
    ...components,
    // TODO: Add custom components here from up above
  };
}
