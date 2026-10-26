/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: { 950: '#050816', 900: '#070b1f', 800: '#0b1230', 700: '#111a3f' },
        brand: { blue: '#2f6bff', cyan: '#22d3ee', purple: '#8b5cf6' },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(47,107,255,.55)',
        'glow-cyan': '0 0 40px -8px rgba(34,211,238,.45)',
      },
    },
  },
  plugins: [],
}
