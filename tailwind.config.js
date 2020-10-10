const contentWidth = 360;
const contentGap = 20;

module.exports = {
  purge: [],
  theme: {
    screens: {
      'sm': `${contentWidth + contentGap * 2}px`,
      'md': `${contentWidth * 2 + contentGap * 3}px`,
      'lg': `${contentWidth * 3 + contentGap * 4}px`,
      'xl': `${contentWidth * 4 + contentGap * 5}px`,
    },
    extend: {
      gridTemplateColumns: {
        'app-min': '0 1fr 0',
        'app-1': `1fr ${contentWidth + contentGap * 2}px 1fr`,
        'app-2': `1fr ${contentWidth * 2 + contentGap * 3}px 1fr`,
        'app-3': `1fr ${contentWidth * 3 + contentGap * 4}px 1fr`,
        'app-4': `1fr ${contentWidth * 4 + contentGap * 5}px 1fr`,
        'app-main-min': '1fr',
        'app-main-1': `${contentWidth}px`,
        'app-main-2': `repeat(2, ${contentWidth}px)`,
        'app-main-3': `repeat(3, ${contentWidth}px)`,
        'app-main-4': `repeat(4, ${contentWidth}px)`,
      },
      gridTemplateRows: {
        'app': 'auto 1fr',
      },
      padding: {
        '9/16': '56.25%',
      },
      spacing: {
        'defaultgap': `${contentGap}px`,
      },
      width: {
        '14': '3.5rem',
      },
    },
  },
  variants: {},
  plugins: [],
};
