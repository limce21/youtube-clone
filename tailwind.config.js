/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		fontFamily: {
			logo: ['Oswald']
		},
		extend: {
			colors: {
				background: {
					light: '#fff',
					dark: '#0f0f0f'
				},
				icons: {
					light: '#0000000d',
					dark: '#ffffff1a'
				},
				border: {
					light: '#dbdbdb',
					dark: '#3c3c3c'
				},
				base: {
					light: '#000',
					dark: '#fff'
				},
				text: {
					light: '#212121',
					dark: '#fff'
				},
				secondary: {
					light: '#737373',
					dark: '#bcbcbc'
				}
			}
		}
	},
	plugins: [require('@tailwindcss/line-clamp')]
};
