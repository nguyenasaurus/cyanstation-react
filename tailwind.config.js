const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
	purge: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./public/index.html",
		"./src/**/*.scss"
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		colors: {
			transparent: "transparent",
			current: "currentColor",
			link: "#1C3CB5",
			highlight: "#40899C",
			navBg: "#ECDFE3"
			// link: {
			// 	DEFAULT: "#1C3CB5"
			// }
		},
		backgroundColor: theme => theme("colors"),
		textColor: theme => theme("colors")
	},
	variants: {
		extend: {}
	},
	plugins: []
};
