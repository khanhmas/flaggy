module.exports = {
    publicPath: './',
    pwa: {
        themeColor: '#42b983',
        msTileColor: '#42b983',
        appleMobileWebAppCache: 'yes',
        manifestOptions: {
            background_color: '#42b983',
        },
        workboxOptions: {
            // exclude: [/_redirects/, /\.map$/],
            exclude: [/_redirects/],
            runtimeCaching: [
                {
                    urlPattern: new RegExp(
                        '^https://restcountries.eu/rest/v2/all'
                    ),
                    handler: 'CacheFirst',
                    options: {
                        // networkTimeoutSeconds: 20,
                        cacheName: 'api-countries-cache',
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                    },
                },
                {
                    urlPattern: new RegExp(
                        '^https://flaggy-unsplash.herokuapp.com/unsplash/search'
                    ),
                    handler: 'StaleWhileRevalidate',
                    options: {
                        // networkTimeoutSeconds: 20,
                        cacheName: 'api-photo-cache',
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                    },
                },
                {
                    urlPattern: new RegExp('^https://restcountries.eu/data'),
                    handler: 'CacheFirst',
                    options: {
                        // networkTimeoutSeconds: 20,
                        cacheName: 'asset-country-cache',
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                    },
                },
                {
                    urlPattern: new RegExp('^https://images.unsplash.com/'),
                    handler: 'StaleWhileRevalidate',
                    options: {
                        // networkTimeoutSeconds: 20,
                        cacheName: 'asset-photo-cache',
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                    },
                },
            ],
        },
    },
};
