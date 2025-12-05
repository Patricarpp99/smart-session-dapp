/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Cosmic Precision Palette
        background: '#0B0C15', // Deep space
        surface: '#151621', // Slightly lighter space
        primary: '#00F0FF', // Electric Cyan
        secondary: '#7000FF', // Deep Violet
        success: '#00FF94', // Emerald Neon
        warning: '#FFC200', // Amber Neon
        danger: '#FF0055', // Rose Neon
        text: {
          primary: '#FFFFFF',
          secondary: '#A0A0B0',
          muted: '#505060'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Outfit', 'sans-serif']
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #0B0C15 0%, #151621 100%)',
        'glass': 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
        'glow-primary': 'radial-gradient(circle at center, rgba(0, 240, 255, 0.15) 0%, transparent 70%)',
      },
      borderColor: {
        glass: 'rgba(255, 255, 255, 0.1)'
      }
    }
  },
  plugins: []
};