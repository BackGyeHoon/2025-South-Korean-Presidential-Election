/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3182F6", // 토스 메인 컬러 - 파란색
        secondary: "#EEEEEE",
        background: "#FFFFFF",
        text: "#191F28",
        "text-light": "#8B95A1",
        accent: "#E5F2FF",
      },
      fontFamily: {
        sans: ["Pretendard", "Apple SD Gothic Neo", "sans-serif"],
      },
    },
  },
  plugins: [],
};
