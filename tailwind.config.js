/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors:{
        midnightBlue: '#0d1f3f',
        biru: '#21242e',
        primary: '#062b9b',
        hr: '#3e4143'
      },
      fontFamily: {
        sans: ['Bebas Neue', 'sans-serif'],
      },
      boxShadow: {
        'white-md': '0 4px 6px rgba(255, 255, 255, 0.9)', // Custom white shadow
      }
    },
  },
  plugins: [],
}

