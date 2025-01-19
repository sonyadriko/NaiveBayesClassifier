module.exports = {
  content: [
    "./index .html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  presets: ['react-app'],
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    '@babel/plugin-proposal-private-property-in-object',
  ],
}
