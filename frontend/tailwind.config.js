
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#ffffff',
        primary: '#9135ff',
        'primary-hover': '#6f26cc',
        'primary-light': 'rgba(145, 53, 255, 0.08)',
        purple: '#9135ff',
        'purple-dark': '#6f26cc',
        'purple-light': '#bfa3ff',
        secondary: '#0a0a0a',
        muted: '#bdbdbd',
        card: '#0a0a0a',
        border: '#222222',
        surface: '#070707',
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
