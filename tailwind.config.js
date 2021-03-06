const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
const frostPlugin = require('./src/tailwind_plugins/frost');
const hoverButton = require('./src/tailwind_plugins/components/hover-button');
// const spreadPlugin = require('./src/tailwind_plugins/keyframes/spread');
// const bgImage = require('./src/assets/background-image/image');

module.exports = {
    corePlugins: {
        gridRow: true,
        gridRowStart: true,
        gridRowEnd: true,
    },
    purge: {
        content: ['./public/**/*.html', './src/**/*.vue'],
        options: {
            // whitelistPatterns: [
            //     /-(leave|enter|appear)(|-(to|from|active))$/,
            //     /^(?!(|.*?:)cursor-move).+-move$/,
            //     /^router-link(|-exact)-active$/,
            // ],
            /**
             * Because these 2 classes are generated in server side, it is necessary to add them into safelist
             * to always include in the production build
             */
            safelist: ['row-span-2', 'col-span-2']
        },
    },
    theme: {
        fontFamily: {
            sans: ['Inter', ...defaultTheme.fontFamily.sans],
        },
        extend: {
            cursor: {
                'zoom-in': 'zoom-in',
                'zoom-out': 'zoom-out',
            },
            colors: {
                teal: colors.teal,
            },
            // textColor: {
            //     teal: colors.teal
            // },
            // borderColor: {
            //     teal: colors.teal
            // }
            // backgroundImage: (theme) => ({
            //     'flaggy-cover-img': 'url(' + bgImage + ')',
            // }),
            /**
             * Method 1: use this below
             * Method 2: create a plugin in a way just like frostPlugin and import it
             */
            // keyframes: {
            //     spread: {
            //         '0%': { width: '2.5rem' },
            //         '100%': { width: '5rem' },
            //     },
            // },
            // animation: {
            //     spread: 'spread 0.3s ease-in-out',
            // }
        },
    },
    darkMode: 'class', // or 'media' or 'class'
    variants: {
        extend: {
            animation: ['hover'],
            width: ['hover'],
        },
    },
    plugins: [
        // spreadPlugin,
        hoverButton,
        frostPlugin,
    ],
};
