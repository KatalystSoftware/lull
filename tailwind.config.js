import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				title: ['Kodchasan', ...defaultTheme.fontFamily.sans],
				sans: ['Poppins', ...defaultTheme.fontFamily.sans]
			},
			height: {
				screen: ['100vh', '100dvh']
			}
		}
	},
	plugins: []
};
