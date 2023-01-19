/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./app/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			keyframes: {
				buttonPress: {
					"0%, 100%": { transform: "scale(1.1)" },
					"50%": { transform: "scale(.95)" },
				},
			},
			animation: {
				buttonPress: "buttonPress 500ms ease-in-out",
			},
		},
	},

	plugins: [],
};
