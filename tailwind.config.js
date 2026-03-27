/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D9E75',
        'primary-light': '#E1F5EE',
        'primary-dark': '#0F6E56',
        danger: '#D85A30',
        background: '#F5F5F0',
        card: '#FFFFFF',
        border: '#E8E8E2',
      },
      borderRadius: {
        card: '14px',
        input: '8px',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', "'Hiragino Sans'", 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
