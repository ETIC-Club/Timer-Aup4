import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "crack-black": "#272727",
        "crack-green": "#3e654f",
        "crack-paper": "#f2f2f2",
        "crack-red": "#d2454b",
        "crack-yellow": "#f4d316",
      },
      keyframes: {
        marquee: {
          "0%": {
            transform: "translate3d(0, 0, 0)",
          },
          "100%": {
            transform: "translate3d(-50%, 0, 0)",
          },
        },
        "marquee-reverse": {
          "0%": {
            transform: "translate3d(-50%, 0, 0)",
          },
          "100%": {
            transform: "translate3d(0, 0, 0)",
          },
        },
      },
      animation: {
        marquee: "marquee 18s linear infinite",
        "marquee-reverse": "marquee-reverse 20s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
