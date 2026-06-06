/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        mint: '#F0F7F4',
        'mint-2': '#E6F2EC',
        void: '#060D08',
        'void-2': '#0C1A0F',
        'void-3': '#112216',
        offwhite: '#F7F9F6',
        lime: '#00E676',
        'lime-dim': '#00C853',
        cyan: '#00E5FF',
        'cyan-dim': '#00B8D4',
        ink: '#0D1F12',
        'ink-2': '#1A3020',
        'muted-dark': '#4A7A5A',
        'muted-light': '#8BA898',
        'text-dark': '#E8F5EC',
        'text-muted-dark': '#7AB88A',
      },
      fontFamily: {
        display: ['Clash Display', 'sans-serif'],
        body: ['Satoshi', 'sans-serif'],
      },
    },
  },
  plugins: [],
}