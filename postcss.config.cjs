module.exports = {
  plugins: {
    "@stylexjs/postcss-plugin": {
      include: ["app/**/*.{js,jsx,ts,tsx}", "mdx-components.ts"],
      babelConfig: {
        babelrc: false,
        parserOpts: { plugins: ["typescript", "jsx"] },
        plugins: [
          [
            "@stylexjs/babel-plugin",
            {
              runtimeInjection: false,
              enableInlinedConditionalMerge: true,
              treeshakeCompensation: true,
              aliases: {
                "@/*": ["./*"],
              },
              unstable_moduleResolution: {
                type: "commonJS",
              },
            },
          ],
        ],
      },
      useCSSLayers: false,
    },
  },
};
