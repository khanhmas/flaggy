const plugin = require('tailwindcss/plugin');

const spreadPlugin = plugin(function({ addUtilities, theme }) {
    const spreadUtilities = {
        '@keyframes spread': {
            '0%':  { width: theme('spacing.10') },
            '100%': { width: theme('spacing.20') },
        }
    };
    addUtilities(spreadUtilities);
});

module.exports = spreadPlugin;
