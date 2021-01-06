import type { CountryState } from '@/store/states/country';
import mutations from '@/store/mutations/country';
import actions from '@/store/actions/country';

const state: CountryState = {
    countries: []
}

export default {
    namespaced: true,
    state,
    mutations: mutations,
    actions: actions,
    getters: {
        countries(state: CountryState) {
            return state.countries;
        }
    }
};
