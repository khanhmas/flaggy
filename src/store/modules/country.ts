import type { CountryState } from '@/store/states/country';
import mutations from '@/store/mutations/country';
import actions from '@/store/actions/country';
import { Country } from '@/types/country';

const state: CountryState = {
    countries: [],
    mapCodeName: {}
}

export default {
    namespaced: true,
    state,
    mutations: mutations,
    actions: actions,
    getters: {
        countries(state: CountryState): Array<Country> {
            return state.countries;
        },
        mapCodeName(state: CountryState): {[key: string]: string} {
            return state.mapCodeName;
        }
    }
};
