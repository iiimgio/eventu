
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#1a1a1a',
        primary: '#e8392c',
        'primary-hover': '#c72c20',
        'primary-light': 'rgba(232, 57, 44, 0.08)',
        coral: '#e8392c',
        'coral-dark': '#c72c20',
        'coral-light': '#ff6b5b',
        secondary: '#f0f0f0',
        muted: '#6b6b6b',
        card: '#ffffff',
        border: '#ebebeb',
        surface: '#f7f7f7',
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.03), 0 8px 24px -8px rgba(0,0,0,0.05)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.06), 0 16px 40px -12px rgba(232,57,44,0.1)',
        'hero': '0 32px 64px -16px rgba(232,57,44,0.25)',
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
