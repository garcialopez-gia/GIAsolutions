import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#060e1a',
          800: '#0a1628',
          700: '#0e1f3a',
          600: '#132540',
        },
        'cyan-glow': '#00d4ff',
        'cyan-mid': '#00b8d9',
        silver: '#9aafc7',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
