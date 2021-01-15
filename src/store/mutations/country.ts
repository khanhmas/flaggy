import type { CountryState } from '@/store/states/country';


export default {
    importCountries(state: CountryState, payload: CountryState): void {
        /**
         * /!\ IMPORTANT: Don't assign neither state = payload nor state = {...payload} nor
         *  state = {
         *      countries: payload.countries,
         *       mapCodeName: payload.mapCodeName
          *  };
         * because this won't trigger the auto-update process in Vuex.
         * It seems like that Vuex create a reference attaching to each property in each state.
         * Anyway, don't recreate the whole state or assigning another reference to the existing state.
         * Do the below instead: modify each attribute's reference instead
         */
        state.countries = payload.countries;
        state.mapCodeName = payload.mapCodeName;
        console.log(state);
    }

}
