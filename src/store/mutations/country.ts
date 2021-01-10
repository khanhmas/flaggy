import type { CountryState } from '@/store/states/country';
import { Country } from '@/types/country';


export default {
    importCountries(state: CountryState, payload: Array<Country>): void {
        state.countries = payload;
    },
    convertFlagSrcBase64(state: CountryState, payload: {name: string, base64: string}): void {
        const res: Country = <Country>state.countries.find((country: Country) => country.name === payload.name);
        res.flag = payload.base64;
        // const index: number = state.countries.findIndex((country: Country) => country.name === payload.name);
        // const new_country: Country = Object.assign({}, state.countries[index]);
        // new_country.base64 = payload.base64;
        // state.countries[index] = new_country;
    },

}
