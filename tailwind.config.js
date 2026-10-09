/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eef8f7',
          100: '#d2ebe7',
          200: '#a8d9d2',
          300: '#6fc4b9',
          400: '#3dbaae',
          500: '#1a6b63',
          600: '#145a54',
          700: '#114a45',
          800: '#0e3b37',
          900: '#0a2c29',
        },
      },
    },
  },
  plugins: [],
};
