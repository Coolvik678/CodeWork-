/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0D0D12', // Obsidian
                primary: '#0D0D12',
                accent: '#C9A84C', // Champagne
                surface: '#FAF8F5', // Ivory
                darkText: '#2A2A35', // Slate
                lightText: '#FAF8F5',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['"Playfair Display"', 'serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
                '6xl': '3rem',
                '7xl': '4rem',
            }
        },
    },
    plugins: [],
}
