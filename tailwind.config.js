/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#05070a', // Ultra Deep Navy (almost black)
          card: '#0f1218',    // Slightly lighter for cards
          glass: 'rgba(15, 18, 24, 0.7)',
        },
        primary: {
          DEFAULT: '#FFD700', // Dominion Gold
          hover: '#E5C100',
          glow: 'rgba(255, 215, 0, 0.5)',
        },
        secondary: {
          DEFAULT: '#1a1d24', // Border/Secondary elements
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#9CA3AF', // Gray-400
          muted: '#6B7280',     // Gray-500
        },
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FFD700 0%, #E5C100 100%)',
      }
    },
  },
  plugins: [],
}
