/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode:"class",
  theme: {
    extend: {
      fontFamily:{
        parisienne: ["Parisienne", "cursive"],
      },
      animation: {
        'spin-slow': 'spin 2.5s linear infinite',
      },
      colors:{
        primary: "#3498DB",
        secondary: "#E74C3C",
        dark: "#111111",
      },
      container:{
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm:'3rem',
        }
      }
    },
  },
  plugins: [],
}

