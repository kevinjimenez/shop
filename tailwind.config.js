/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        background: '#fef6e4',
        headline: '#001858',
        paragraph: '#172c66',
        main: '#f3d2c1',
        secundary: '#8bd3dd',
        tertiary: '#f582ae',
        highlight: '#fef6e4',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
