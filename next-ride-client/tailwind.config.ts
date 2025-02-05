import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        auth:"#2e2e2e",
        inputhover:"#835e49",
        input:"#b68d76",
        formBg:"#E9E9E9",
      },
      fontFamily:{
        audiowide:["Audiowide", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        robotoMono: ["Roboto Mono", "monospace"],
        fontKoushan:["Kaushan Script", "serif"]
      },
      animation:{
        fadeIn: "fadeIn 1s ease-in-out"
      },
      keyframes:{
        fadeIn:{
          "0%":{ opacity:"0" },
          "100%":{ opacity:"1" }

        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
} satisfies Config;
