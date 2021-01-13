// import frostPlugin from '@/tailwind_plugins/frost';

const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors')
const frostPlugin = require('./src/tailwind_plugins/frost');
const bgImage = require('./src/assets/background-image/image');

module.exports = {
    future: {
        // removeDeprecatedGapUtilities: true,
        // purgeLayersByDefault: true,
    },
    purge: {
        content: ['./public/**/*.html', './src/**/*.vue'],
        // options: {
        //   whitelistPatterns: [
        //     /-(leave|enter|appear)(|-(to|from|active))$/,
        //     /^(?!(|.*?:)cursor-move).+-move$/,
        //     /^router-link(|-exact)-active$/
        //   ]
        // }
    },
    theme: {
        fontFamily: {
            sans: ['Inter', ...defaultTheme.fontFamily.sans],
        },
        extend: {
            backgroundImage: (theme) => ({
                'flaggy-cover-img': 'url(' + bgImage + ')',
            }),
            colors: {
                emerald: colors.emerald
            }
        },
    },
    darkMode: false, // or 'media' or 'class'
    variants: {
        extend: {
            animation: ['hover'],
        },
    },
    plugins: [frostPlugin],
};
