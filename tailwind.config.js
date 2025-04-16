/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6B46C1", // 중립적인 보라색 계열
        secondary: "#EEEEEE",
        background: "#FFFFFF",
        text: "#191F28",
        "text-light": "#8B95A1",
        accent: "#F3E8FF",
      },
      fontFamily: {
        sans: ["Pretendard", "Apple SD Gothic Neo", "sans-serif"],
      },
    },
  },
  plugins: [],
};
