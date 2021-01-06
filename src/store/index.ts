import { createStore } from 'vuex';
import country from './modules/country';

export default createStore({
  modules: {
    country
  }
});
