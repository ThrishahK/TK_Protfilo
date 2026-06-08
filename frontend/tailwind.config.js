export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 35px 120px -45px rgba(99, 102, 241, 0.75)',
      },
      backgroundImage: {
        'grid-fade': 'radial-gradient(circle at center, rgba(255,255,255,0.08), transparent 25%)',
      },
    },
  },
  plugins: [],
}
