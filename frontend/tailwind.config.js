// tailwind.config.js
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  // Mantenemos 'class' por si acaso, pero el estilo base ya es oscuro.
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "var(--color-primary)",
        "background-base": "var(--color-background-base)",
        "form-bg": "var(--color-form-bg)", // Mapeamos el fondo del input
      },
      fontFamily: {
        "display": "var(--font-display)",
      },
    },
  },
  plugins: [forms],
};