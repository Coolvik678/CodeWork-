module.exports = {
  content: [
    './layout/*.liquid',
    './sections/*.liquid',
    './snippets/*.liquid',
    './templates/*.json',
    './assets/*.js'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0B0B0F',
        'ink-card': '#13131A',
        'ink-elevated': '#1B1B24',
        bone: '#EDE6D8',
        'bone-muted': 'rgba(237, 230, 216, 0.65)',
        amber: '#C8862B',
        'amber-lit': '#E0A94E',
        'border-dim': 'rgba(237, 230, 216, 0.12)'
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
