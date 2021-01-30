import { createStore } from 'vuex';
import country from '@/store/modules/country';

export default createStore({
  modules: {
    country,
  }
});
