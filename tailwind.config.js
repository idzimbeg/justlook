/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
      },
      backgroundImage: {
        error: "url('../public/image/error-image.jpg')",
        footer: "url('../public/image/screens.jpg')",
      },
      colors: {
        common: {
          light: '#F7F7F8',
          base: '#060d17',
          badge: '#657182',
          status: '#222C38',
          active: '#090F1A',
          passive: '#10161D',
          yellow: '#FBD446',
          red: '#EB3B5A',
        },
      },
    },
    plugins: [],
  },
};
