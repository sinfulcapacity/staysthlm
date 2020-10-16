// module.exports = {
//   future: {
//     // removeDeprecatedGapUtilities: true,
//     // purgeLayersByDefault: true,
//     // defaultLineHeights: true,
//     // standardFontWeights: true
//   },
//   purge: [],
//   theme: {
//     extend: {}
//   },
//   variants: {},
//   plugins: []
// }

module.exports = {
  purge: ["./src/**/*.svelte"],
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
