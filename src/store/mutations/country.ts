import type { CountryState } from '@/store/states/country';
import { Country } from '@/types/country';


export default {
    importCountries(state: CountryState, payload: Array<Country>): void {
        state.countries = payload;
    }

}
