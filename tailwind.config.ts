import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      night: '#121212',
      eireblack: '#1C1C1E',
      raisinblack: '#272727',
      battleshipgray: '#636563',
      azure: '#007AFF',
      onyx: '#3A3A3C',
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'gradient-apple': 'linear-gradient(to top left, var(--tw-gradient-stops))'
      },
      gradientColorStops: {
        'orange': '#F98A3F', // Orange
        'pink': '#F94E8A',   // Pink
        'purple': '#A166FF', // Purple
        'blue': '#4A6CF7',   // Light Blue
      },
    },
  },
  plugins: [typography],
};
export default config;
