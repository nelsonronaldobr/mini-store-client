/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                'tilt-warp': ['Tilt Warp', 'cursive'],
                'passion-one': ['Passion One', 'cursive'],
                'open-sans': ['Open Sans', 'sans-serif']
            }
        }
    },
    plugins: []
};
