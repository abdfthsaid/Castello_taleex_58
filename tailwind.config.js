/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontSize: {
        "xs-sm": "0.75rem",
        "sm-md": "0.875rem",
        "md-lg": "1rem",
        "lg-xl": "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
