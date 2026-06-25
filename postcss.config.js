const babelConfig = {
  presets: ["next/babel"],
  plugins: [
    [
      "@stylexjs/babel-plugin",
      {
        runtimeInjection: false,
        genConditionalClasses: true,
        treeshakeCompensation: true,
        unstable_moduleResolution: { type: "commonJS", rootDir: "." },
      },
    ],
  ],
};

export default {
  plugins: {
    "@stylexjs/postcss-plugin": {
      include: ["app/**/*.{js,jsx,ts,tsx}", "mdx-components.ts"],
      useCSSLayers: true,
      babelConfig,
    },
  },
};
