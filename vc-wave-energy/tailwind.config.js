module.exports = {
  theme: {
    extend: {
      animation: {
        'draw': 'drawCircle 60s linear forwards',
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