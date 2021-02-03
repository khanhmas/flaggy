# Flaggy

## Features
1. Search country - Done
2. Display detail country - Done
3. Navigate between country borders - Done
4. Switch theme between light mode and dark mode - Done
5. Display photos using [Unsplash REST API](https://unsplash.com/documentation) and [unsplash-js](https://github.com/unsplash/unsplash-js) proxifying via an Express Server - Done
6. Display blurhash placeholder while the photos are being loaded - Done
7. Improve responsive design on photos - Done
8. Add offline mode (added service worker) - Done
9. Add leaflet features - Done
10. Add chart - In progress

## Technologies

Front: Typescript, Vue 3, Vuex, Vue router, Tailwind CSS, Blurhash, ESlint, Leaflet

Back: Express/NodeJS

API: [REST Countries](https://restcountries.eu), [Unsplash REST API](https://unsplash.com/documentation), [unsplash-js](https://github.com/unsplash/unsplash-js)

Hosting: Netlify

Tests: Jest, Cypress


## Live demo
See [https://flaggy.netlify.app/](https://flaggy.netlify.app/).

Tested browsers: Chrome, Firefox, Safari, Edge

Issues found:
  1. On MacOS Firefox, animation doesn't execute smoothly
  2. On MacOS Firefox, the keydown event doesn't get removed by removeEventListener

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
