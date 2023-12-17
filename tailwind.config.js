/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        "dark": "#121212",
        "group-text": "#202124",
        "group-grey": "#dadce0",
        "group-red": "#f28b82",
        "group-yellow": "#fdd763",
        "group-green": "#81c995",
        "group-cyan": "#78d9ec",
        "group-blue": "#82b3f8",
        "group-pink": "#ff8bcb",
        "group-orange": "#fcad70",
        "group-purple": "#c58af9"
      }
    },
  },
  plugins: [],
}

