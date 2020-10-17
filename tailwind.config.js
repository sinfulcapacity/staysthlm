module.exports = {
  purge: ['./src/**/*.svelte', './src/**/*.html'],
  variants: {},
  theme: {
    extend: {},
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
};
