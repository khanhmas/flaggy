import { createApp } from 'vue';
import App from './App.vue';
// import './registerServiceWorker';
import router from './router';
import store from './store';
import '@/assets/css/tailwind.css';
import wb from './registerServiceWorker';
import { Vue } from 'vue-class-component';

(Vue.prototype as any).$workbox = wb;

createApp(App)
    .use(store)
    .use(router)
    .mount('#app');
