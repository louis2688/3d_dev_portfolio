/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        // cosmic base
        primary: '#05060f',
        'primary-2': '#080a18',
        secondary: '#9b96c4',
        tertiary: '#0e1024',
        'black-100': '#0a0b1a',
        'black-200': '#060713',
        'white-100': '#f3f3ff',
        // accents
        violet: '#7c5cff',
        'violet-deep': '#4b32c3',
        cyan: '#22d3ee',
        magenta: '#ff5cf0',
        glow: '#b9a4ff',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0px 35px 120px -15px rgba(124, 92, 255, 0.25)',
        glow: '0 0 40px -8px rgba(124, 92, 255, 0.55)',
        'glow-cyan': '0 0 40px -8px rgba(34, 211, 238, 0.5)',
      },
      screens: {
        xs: '450px',
      },
      backgroundImage: {
        'hero-pattern': "url('/src/assets/herobg.png')",
        'radial-fade':
          'radial-gradient(ellipse at 50% 0%, rgba(124,92,255,0.18), transparent 60%)',
        'grid-faint':
          'linear-gradient(rgba(124,92,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,92,255,0.06) 1px, transparent 1px)',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 1 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
