module.exports = {
  purge: ['./src/**/*.svelte', './src/**/*.html'],
  variants: {},
  theme: {
    fontFamily: {
      // display: ['Inter', 'sans-serif'],
      // body: ['Inter', 'sans-serif'],
      'display': ['Poppins', 'sans-serif'],
      'body': ['Poppins', 'sans-serif']
    },
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
