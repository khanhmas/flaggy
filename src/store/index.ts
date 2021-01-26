import { createStore } from 'vuex';
import country from '@/store/modules/country';
import photo from '@/store/modules/photo';

export default createStore({
  modules: {
    country,
    // try to use $store.registerModule later
    photo
  }
});
