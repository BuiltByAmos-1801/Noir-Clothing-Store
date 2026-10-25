/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        noir: {
          paper: '#f4f0e8',
          cream: '#e9e1d4',
          sand: '#d2c2ad',
          ink: '#201e1b',
          muted: '#777168',
          line: '#d8d0c4',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      letterSpacing: {
        luxury: '0.22em',
      },
      boxShadow: {
        soft: '0 20px 60px rgba(32, 30, 27, 0.08)',
      },
    },
  },
  plugins: [],
}