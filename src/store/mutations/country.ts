import type { CountryState } from '@/store/states/country';
import { Country } from '@/types/country';


export default {
    convertFlagSrcBase64(state: CountryState, payload: {name: string, base64: string}): void {
        const res: Country = <Country>state.countries.find((country: Country) => country.name === payload.name);
        res.flag = payload.base64;
        // const index: number = state.countries.findIndex((country: Country) => country.name === payload.name);
        // const new_country: Country = Object.assign({}, state.countries[index]);
        // new_country.base64 = payload.base64;
        // state.countries[index] = new_country;
    },
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
    }

}
