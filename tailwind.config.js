/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./redux/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brandColor: "#0066FF",
        mainBG: "#04111C",
        textColor: "#FFFFFF",
        gradientLeft: "#0066FF",
        gradientRight: "#3F00FF",
        "2BG": "#1D2832",
        "3BG": "#333D46",
        "4BG": "#475058",
        "5BG": "#596168",
        "6BG": "#697077",
        highPriority: "#D24040",
        mediumPriority: "#D28640",
        lowPriority: "#4095D2",
      },
    },
  },
  plugins: [],
};
