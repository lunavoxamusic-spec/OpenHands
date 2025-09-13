/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'tunova-green': '#81ff8a',
        'tunova-dark-green': '#64965e',
        'tunova-light-green': '#00ff88',
        'tunova-medium-green': '#44aa66',
        'tunova-pale-green': '#66ffaa',
      },
      animation: {
        'shine': 'shine 1.5s ease-in-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'holographic': 'holographic 3s linear infinite',
        'glitch': 'glitch 0.3s ease-in-out infinite',
        'morphing': 'morphing 8s ease-in-out infinite',
        'cassette-spin': 'cassette-spin 2s linear infinite',
        'liquid-wave': 'liquid-wave 3s ease-in-out infinite',
        'particle-float': 'particle-float 4s ease-in-out infinite',
        'dna-helix': 'dna-helix 10s linear infinite',
        'wave-flow': 'wave-flow 4s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        shine: {
          '0%': { transform: 'translateX(-100%) skewX(-12deg)' },
          '100%': { transform: 'translateX(200%) skewX(-12deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotateY(0deg)' },
          '50%': { transform: 'translateY(-20px) rotateY(180deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(129, 255, 138, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(129, 255, 138, 0.6)' },
        },
        holographic: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        morphing: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        'cassette-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'liquid-wave': {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.1) rotate(180deg)' },
        },
        'particle-float': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) translateX(5px) rotate(120deg)' },
          '66%': { transform: 'translateY(5px) translateX(-5px) rotate(240deg)' },
        },
        'dna-helix': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        'wave-flow': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'holographic': 'linear-gradient(45deg, #81ff8a, #00ff88, #64965e, #44aa66, #81ff8a)',
        'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        'neon-glow': 'radial-gradient(circle, rgba(129, 255, 138, 0.3) 0%, transparent 70%)',
      },
      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
      },
      boxShadow: {
        'neon-green': '0 0 20px rgba(129, 255, 138, 0.5)',
        'neon-green-strong': '0 0 40px rgba(129, 255, 138, 0.8)',
        'neon-dark-green': '0 0 20px rgba(100, 150, 94, 0.5)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.37)',
        '3d': '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'inner-glow': 'inset 0 0 20px rgba(129, 255, 138, 0.2)',
      },
      textShadow: {
        'neon': '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
        'glow': '0 0 5px currentColor',
      },
      perspective: {
        '500': '500px',
        '1000': '1000px',
        '2000': '2000px',
      },
      transformStyle: {
        '3d': 'preserve-3d',
      },
      backfaceVisibility: {
        'hidden': 'hidden',
        'visible': 'visible',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        'display': ['Orbitron', 'Exo 2', 'Rajdhani', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
      },
    },
  },
  plugins: [
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.text-shadow-neon': {
          textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
        },
        '.text-shadow-glow': {
          textShadow: '0 0 5px currentColor',
        },
        '.perspective-500': {
          perspective: '500px',
        },
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.perspective-2000': {
          perspective: '2000px',
        },
        '.transform-style-3d': {
          transformStyle: 'preserve-3d',
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden',
        },
        '.backface-visible': {
          backfaceVisibility: 'visible',
        },
        '.glass-effect': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-effect-strong': {
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        },
        '.glass-effect-subtle': {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.neon-border-green': {
          border: '1px solid #81ff8a',
          boxShadow: '0 0 10px rgba(129, 255, 138, 0.5), inset 0 0 10px rgba(129, 255, 138, 0.1)',
        },
        '.liquid-button': {
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(45deg, #81ff8a, #64965e)',
          transition: 'all 0.3s ease',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
            transition: 'left 0.5s ease',
          },
          '&:hover::before': {
            left: '100%',
          },
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 30px rgba(129, 255, 138, 0.4)',
          },
        },
        '.magnetic': {
          transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
        '.gpu-accelerated': {
          transform: 'translateZ(0)',
          willChange: 'transform',
        },
        '.smooth-animation': {
          animationFillMode: 'both',
          animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        },
      };

      addUtilities(newUtilities);
    },
    function({ addComponents, theme }) {
      const components = {
        '.holographic-text': {
          background: 'linear-gradient(45deg, #81ff8a, #00ff88, #64965e, #44aa66, #81ff8a)',
          backgroundSize: '400% 400%',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'holographic 3s ease-in-out infinite',
        },
        '.cassette-player': {
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        },
        '.cassette-body': {
          background: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)',
          borderRadius: '8px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        },
        '.cassette-reel': {
          background: 'radial-gradient(circle, #333, #111)',
          borderRadius: '50%',
          position: 'relative',
          '&.spinning': {
            animation: 'cassette-spin 2s linear infinite',
          },
        },
        '.particle-system': {
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          overflow: 'hidden',
        },
        '.morphing-blob': {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '300px',
          background: 'linear-gradient(45deg, rgba(129, 255, 138, 0.2), rgba(100, 150, 94, 0.2))',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          animation: 'morphing 8s ease-in-out infinite',
          filter: 'blur(40px)',
        },
      };

      addComponents(components);
    },
  ],
};