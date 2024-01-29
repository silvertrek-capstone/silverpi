/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: '#6699FF',
        secondary: '#002159',
        accent1: '#FCC963',
        accent2: '#03D1FF',
        neutral1: '#FFFFFF',
        neutral2: '#B5BFCF',
        neutral3: '#B5BFCF',
        neutral4: '#000000',
      },
      fontSize: {
        '15xl': '15rem',
        '25xl': '25rem', // custom text size for 404 page
        '30xl': '30rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
