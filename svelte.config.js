const sveltePreprocess = require("svelte-preprocess");

module.exports = {
    preprocess: sveltePreprocess({
        scss: {
            includePaths: ["src", "node_modules"],
        },
        postcss: {
            plugins: [require("postcss-import")(), require("postcss-nested")(), require("tailwindcss"), require("autoprefixer")],
        },
    }),
};
