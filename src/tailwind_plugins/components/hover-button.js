const plugin = require('tailwindcss/plugin');

const hoverButton = plugin(function({ addComponents, theme  }) {
    const component = {
        '.flaggy-hover-button': {
            width: theme('spacing.10'),
            span: {
                opacity: 0,
                'transition-timing-function': 'cubic-bezier(0, 0, 0.2, 1)'
            },
            '&:hover': {
                width: theme('spacing.20'),
                span: {
                    opacity: 1,
                    'transition-delay': '300ms'
                }
            }
        }
    };
    addComponents(component);
});

module.exports = hoverButton ;
