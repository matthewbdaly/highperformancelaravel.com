/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx,css}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'caribbean-green': {
          '50': '#e9fff7',
          '100': '#caffeb',
          '200': '#9affdc',
          '300': '#59fccc',
          '400': '#10daa6',
          '500': '#00d6a2',
          '600': '#00af85',
          '700': '#008c6f',
          '800': '#006e59',
          '900': '#005a4b',
          '950': '#00332b',
        },
      }
    },
  },
  plugins: [],
}
