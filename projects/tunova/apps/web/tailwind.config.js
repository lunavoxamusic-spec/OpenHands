/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Tunova Brand Colors
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        neon: {
          green: '#81ff8a',
          'green-dark': '#64965e',
          pink: '#ff6b9d',
          blue: '#4ecdc4',
          purple: '#a8e6cf',
          yellow: '#ffd93d',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'neon-gradient': 'linear-gradient(135deg, #81ff8a 0%, #64965e 100%)',
        'cassette-gradient': 'linear-gradient(45deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'cassette-spin': 'cassette-spin 2s linear infinite',
        'tape-move': 'tape-move 4s linear infinite',
        'vu-meter': 'vu-meter 0.1s ease-in-out infinite alternate',
      },
      keyframes: {
        'pulse-neon': {
          '0%': {
            boxShadow: '0 0 5px #81ff8a, 0 0 10px #81ff8a, 0 0 15px #81ff8a',
          },
          '100%': {
            boxShadow: '0 0 10px #81ff8a, 0 0 20px #81ff8a, 0 0 30px #81ff8a',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow': {
          '0%': {
            textShadow: '0 0 5px #81ff8a, 0 0 10px #81ff8a, 0 0 15px #81ff8a',
          },
          '100%': {
            textShadow: '0 0 10px #81ff8a, 0 0 20px #81ff8a, 0 0 30px #81ff8a',
          },
        },
        'cassette-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'tape-move': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'vu-meter': {
          '0%': { height: '10%' },
          '100%': { height: '100%' },
        },
      },
      fontFamily: {
        'retro': ['Orbitron', 'monospace'],
        'display': ['Exo 2', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 5px #81ff8a, 0 0 10px #81ff8a, 0 0 15px #81ff8a',
        'neon-strong': '0 0 10px #81ff8a, 0 0 20px #81ff8a, 0 0 30px #81ff8a',
        'cassette': 'inset 0 2px 4px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.2)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};