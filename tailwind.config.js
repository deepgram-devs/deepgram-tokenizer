/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        favorit: ['ABCFavorit-Bold', 'sans'],
        inter: ['Inter', 'sans-serif'],
        firaCode: ['Fira Code', 'monospace']
      },
      colors: {
        raisinBlack: '#1A1A1F'
      }
    }
  },
  plugins: []
}
