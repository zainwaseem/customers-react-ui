/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#36d7b7",
        secondary: "#111111",
        tertiary: "#222222",
      },
    },
  },
  plugins: [],
};
