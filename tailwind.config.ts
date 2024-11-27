import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent_white: 'rgba(255, 255, 255, 0.2)',
        dark_blue: '#1E264A',
        light_blue: '#063D97',
        dark_blue_hover: '#39488C',
        yellow: '#FCC602',
        light_black: '#6B6B6B',
        gray: '#BEBEBE',
        light_gray: '#DBDBDB',
        transparent_gray: 'rgba(190, 190, 190, 0.3)',
        red: '#D60000',
      },
      fontSize: {
        title_1: '40px',
        title_2: '32px',
      },
      fontFamily: {
        'anek-bangla': ['"Anek Bangla"', 'sans-serif'],
        'open-sans': ['"Open Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
