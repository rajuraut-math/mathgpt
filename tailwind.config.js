/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          50: '#EFF6FF',
          100: '#DBEAFE',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        premium: '#F59E0B',
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'dots': 'dots 1.4s infinite ease-in-out',
      },
      keyframes: {
        dots: {
          '0%, 80%, 100%': { opacity: '0' },
          '40%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
