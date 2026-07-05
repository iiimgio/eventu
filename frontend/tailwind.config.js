
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#06060a',
        foreground: '#f5f7ff',
        primary: '#8b5cf6',
        'primary-hover': '#7c3aed',
        'primary-light': 'rgba(139, 92, 246, 0.14)',
        purple: '#8b5cf6',
        'purple-dark': '#7c3aed',
        'purple-light': '#cbb8ff',
        secondary: '#111117',
        muted: '#a4a8b6',
        card: '#12121a',
        border: '#2a2a35',
        surface: '#0b0b10',
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.03), 0 8px 24px -8px rgba(0,0,0,0.05)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.06), 0 16px 40px -12px rgba(145,53,255,0.12)',
        'hero': '0 32px 64px -16px rgba(145,53,255,0.18)',
        'nav': '0 4px 24px rgba(0,0,0,0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
