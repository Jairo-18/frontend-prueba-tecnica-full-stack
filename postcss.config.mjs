/** @type {import('tailwindcss').Config} */
const config = {
  plugins: ['@tailwindcss/postcss'],
  theme: {
    extend: {
      colors: {
        'red-radish': '#E7324A',
        'existential-angst': '#0A0A0A',
        'fugitive-flamingo': '#F36DA3',
        'dr-white': '#FAFAFA',
        'manganese-red': '#E7344C',
      },
    },
  },
};

export default config;
