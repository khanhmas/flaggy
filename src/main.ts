import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import '@/assets/css/tailwind.css';

// const app = createApp(App)
// .use(store)
// .use(router);

// router.isReady().then(() => {
//     app.mount('#app');
// });

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
