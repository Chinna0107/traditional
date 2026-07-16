/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-orange': '#E8630A',
        'brand-maroon': '#4A2C1D',
        'brand-gold': '#C9971C',
        'brand-cream': '#FFF8EE',
        'brand-cream-light': '#FDF6ED',
        'brand-green': '#3E9B4F',
        'brand-gray': '#8A8A8A',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
