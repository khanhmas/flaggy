# Flaggy

## Features
1. Search countries - Done
2. Display detail country - Done
3. Navigate between country borders - Done
4. Switch theme between light mode and dark mode - Done
5. Display photos using [the library unsplash-js](https://github.com/unsplash/unsplash-js) proxifying via an [Express Server](https://github.com/khanhmas/flaggy-unsplash) - Done
6. Display blurhash placeholder while the photos are being loaded - Done
7. Improve responsive design on photos - Done
8. Add offline mode (service worker) - Done
9. Add interactive leaflet features using GeoJSON - Done
10. Add population chart - Done
11. Add linear gradients (generated from flag colors) on detail info page - Done

## Technologies

Front: Typescript, Vue 3, Vuex, Vue router, Tailwind CSS, Blurhash, ESlint, Leaflet

Back: Express/NodeJS

API: [REST Countries](https://restcountries.eu), [Unsplash REST API](https://unsplash.com/documentation)

Hostings: Netlify, Heroku

Tests: Jest, Cypress


## Live demo
See [https://flaggy.netlify.app/](https://flaggy.netlify.app/).

Tested browsers: Chrome, Firefox, Safari, Edge

Issues found:
  1. In MacOS Firefox, animation doesn't execute smoothly
  2. In MacOS Firefox, the keydown event doesn't get removed by removeEventListener on back button
  3. During first connection to Heroku server, it will take quiet a long time to display the photo gallery. (Reason: Heroku will shut down the container server if it sits idly for a while)
  4. Disable text-fill-color on safari devices: desktop and mobile because it seems like text-fill-color doesn't work with grid template

## Note
For local development:
To have the photo gallery work locally, this project needs to be paired with this [Express Server](https://github.com/khanhmas/flaggy-unsplash)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
