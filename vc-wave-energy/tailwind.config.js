module.exports = {
  theme: {
    extend: {
      animation: {
        'draw': 'drawCircle var(--circle-dur) linear forwards',
      },
      keyframes: {
        drawCircle: {
          'to': { 'stroke-dashoffset': '0' },
        },
      },
    },
  },
  plugins: [],
}