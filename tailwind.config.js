/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        safetyBlue: {
          light: '#005CE6',
          DEFAULT: '#0047AB',
          dark: '#003893',
          deep: '#001F54',
        },
        safetyRed: {
          light: '#FF333B',
          DEFAULT: '#E31B23',
          dark: '#B7151B',
        },
        industrial: {
          bg: '#0F172A',
          card: '#1E293B',
          border: '#334155',
        }
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'premium': '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05)',
        'safety-blue': '0 10px 25px -5px rgba(0, 71, 171, 0.3)',
        'safety-red': '0 10px 25px -5px rgba(227, 27, 35, 0.3)',
      }
    },
  },
  plugins: [],
}
