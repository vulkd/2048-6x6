module.exports = {
  theme: {
    extend: {
      cursor: {
        'grab': 'grab',
      },
      fontSize: {
        'xxxs': '.6rem',
        'xxs': '.7rem'
      },
      maxWidth: {
        '7xl': '84rem',
        '8xl': '90rem',
        '9xl': '102rem'
      }
    }
  },
  variants: {
    backgroundColor: ['dark', 'dark-hover', 'dark-group-hover'],
    borderColor: ['dark', 'dark-focus', 'dark-focus-within'],
    textColor: ['dark', 'dark-hover', 'dark-active']
  },
  plugins: [
    require('tailwindcss-dark-mode')(),
  ]
}

