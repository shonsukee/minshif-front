import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
				backgroundImage: {
					"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
					"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
				},
				height: {
					"10v": "10vh",
					"20v": "20vh",
					"30v": "30vh",
					"40v": "40vh",
					"50v": "50vh",
					"60v": "60vh",
					"70v": "70vh",
					"80v": "80vh",
					"90v": "90vh",
					"100v": "100vh",
				},
				margin: {
					'static': '0px max(-612px + 50vw, 48px)',
				},
		}
	},
	plugins: [],
};
export default config;
