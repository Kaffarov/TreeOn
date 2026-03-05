module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f0',
          100: '#dcf0dc',
          200: '#bae1ba',
          300: '#8fcc8f',
          400: '#5fb25f',
          500: '#2e8b57',
          600: '#267347',
          700: '#1f5c3a',
          800: '#18452d',
          900: '#112e1f',
        },
      },
    },
  },
  plugins: [],
}