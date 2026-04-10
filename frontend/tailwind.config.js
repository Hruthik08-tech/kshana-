export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cloud-white': '#f4f9ff',
        'soft-breeze': '#e6f0fa',
        'clear-sky': '#cce0f5',
        'delight-blue': '#6ba4e9',
        'deep-delight': '#4a8bdd',
        'midnight-navy': '#1a2b4c', 
      },
      fontFamily: {
        sans: ['Work Sans', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['Work Sans', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Familjen Grotesk', 'system-ui', 'sans-serif'],
        logo: ['Familjen Grotesk', 'system-ui', 'sans-serif'],
        subtitle: ['Work Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeInUp: {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
