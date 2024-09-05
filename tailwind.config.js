/** @type {import('tailwindcss').Config} **/
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'roboto-sans': ['Roboto', 'sans-serif'],
      },
      colors: {
        'carrot-orange': {
          '50': '#fdf9ef',
          '100': '#fbf0d9',
          '200': '#f6deb2',
          '300': '#efc682',
          '400': '#e8a54f',
          '500': '#e49137',
          '600': '#d47322',
          '700': '#b0591e',
          '800': '#8d471f',
          '900': '#723c1c',
          '950': '#3d1c0d',
        },
      },
    },
  },
  plugins: [],
}

