const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const postcssImport = require('postcss-import')
const postcssNested = require('postcss-nested')
const tailwindCSS = require('tailwindcss')
const postcssCustomProperties = require('postcss-custom-properties')
const postcssPresetEnv = require('postcss-preset-env')

const mode = process.env.NODE_ENV;
const production = mode === 'production';

module.exports = {
    syntax: 'postcss-scss',
    scss: {
        includePaths: ["src", "node_modules"],
    },
    plugins: [
        postcssImport,
        tailwindCSS(),
        postcssNested,
        postcssCustomProperties,
        postcssPresetEnv({ stage: 1 }),
        production && cssnano({
            preset: [
                'default',
                {discardComments: {removeAll: true}},
            ],
        }),
        autoprefixer,
    ].filter(Boolean)
}
