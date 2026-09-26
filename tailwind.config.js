/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#fafaf7',
        tile: '#efeee9',
        ink: '#141414',
        mute: '#6b6a66',
        line: '#dedcd5',
        accent: '#d8ff3d',
      },
      fontFamily: {
        sans: ['"Manrope Variable"', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: { tile: '18px' },
    },
  },
  plugins: [],
}
