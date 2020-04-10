const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const purgecss = require("@fullhuman/postcss-purgecss");

const ENABLE_PURGECSS = process.env.NODE_ENV === "production";

module.exports = () => {
	return {
		plugins: [
			tailwindcss("./tailwind.config.js"),
			ENABLE_PURGECSS && purgecss({
				content: [
					"./src/**/*.html",
					"./src/**/*.vue",
					"./src/**/*.css",
					"./src/*.html",
					"./src/*.css"
				],
				whitelist: [
					"mode-dark"
				],
				whitelistPatterns: [
					/^mceu/u
				],
				extractors: []
			}),
			autoprefixer({
				add: true,
				grid: false
			})
		]
	};
};
