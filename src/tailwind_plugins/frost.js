const plugin = require('tailwindcss/plugin');

const frostPlugin = plugin(function({ addUtilities }) {
    const frostUtilities = {
        '.flaggy-frost': {
            // 'background-color': 'rgba(255, 255, 255, 0.2)',
            // 'backdrop-filter': 'blur(20px) saturate(160%) contrast(45%) brightness(140%) opacity(0)',
            // '-webkit-backdrop-filter': 'blur(20px) saturate(160%) contrast(45%) brightness(140%) opacity(0)',
            // adding opacity(0) to prevent flickering when hovering on .flaggy-frost
            '-webkit-backdrop-filter': 'blur(10px) opacity(0)',
            'backdrop-filter': 'blur(10px) opacity(0)',
            'background-color': 'rgba(255, 255, 255, 0.7)'
        }
    };
    addUtilities(frostUtilities, ['responsive', 'hover']);
});

module.exports = frostPlugin;
