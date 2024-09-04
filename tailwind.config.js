/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
			},
			colors: {
				primary: '#9493FF',
				accent: '#E8704E',
				default: '#6C6C6C',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				fadeOut: {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' },
				},
				slideIn: {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				slideOut: {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(100%)' },
				},
				fadeInSlideIn: {
					'0%': { opacity: '0', transform: 'translateX(50%)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				fadeOutSlideOut: {
					'0%': { opacity: '1', transform: 'translateX(0)' },
					'100%': { opacity: '0', transform: 'translateX(50%)' },
				},
			},
			animation: {
				fadeIn: 'fadeIn .5s ease-in-out',
				fadeOut: 'fadeOut .5s ease-in-out forwards',
				slideIn: 'slideIn .5s ease-in-out',
				slideOut: 'slideOut .5s ease-in-out forwards',
				fadeInSlideIn: 'fadeInSlideIn .5s ease-in-out',
				fadeOutSlideOut: 'fadeOutSlideOut .5s ease-in-out forwards',
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
