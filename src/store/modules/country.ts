import type { CountryState } from '@/store/states/country';
import mutations from '@/store/mutations/country';
import actions from '@/store/actions/country';
import getters from '@/store/getters/country';

const state: CountryState = {
    countries: [],
    mapCodeName: {}
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
