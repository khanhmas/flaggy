import type { CountryState } from '@/store/states/country';
import { createStore } from 'vuex';
import country from './modules/country';

import mutations from '@/store/mutations/country';
import actions from '@/store/actions/country';

const state: CountryState = {
  countries: []
}

export default createStore({
  state,
  mutations: mutations,
  actions: actions,
  getters: {
    getAllCountries(state: CountryState) {
        console.log('sad: ', state);
        return state.countries;
    }
  }
  // modules: {
  //   country
  // }
});
