/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'void': '#020205',
        'void-light': '#0a0b14',
        'plasma-blue': '#00f0ff',
        'plasma-purple': '#bf00ff',
        'biolum-green': '#00ff66',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'plasma-gradient': 'linear-gradient(135deg, rgba(0, 240, 255, 0.1) 0%, rgba(191, 0, 255, 0.1) 100%)',
        'grid-pattern': 'linear-gradient(to right, rgba(0, 240, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.05) 1px, transparent 1px)',
      },
      boxShadow: {
        'neon-blue': '0 0 15px rgba(0, 240, 255, 0.5)',
        'neon-purple': '0 0 15px rgba(191, 0, 255, 0.5)',
        'neon-green': '0 0 15px rgba(0, 255, 102, 0.5)',
      }
    },
  },
  plugins: [],
}
