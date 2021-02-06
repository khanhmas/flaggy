module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '^.+\\.tsx?$': 'ts-jest',
        // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    moduleFileExtensions: [
        'js',
        'ts',
        'json',
        // tell Jest to handle `*.vue` files
        'vue',
    ],
    snapshotSerializers: ['jest-serializer-vue'],
};
