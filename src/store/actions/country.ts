import { CountryService } from '@/services/country.service';
import { Country } from '@/types/country';
import { CountryState } from '../states/country';

export default {
    async fetchCountries({ commit }: {commit: any}): Promise<any> {
        const result: Array<any> = await CountryService.fetchAll();
        const payload: CountryState = {
            countries: [],
            mapCodeName: {}
        };
        result.forEach((country: Country) => {
            payload.countries.push({
                ...country,
                population: Number(country.population).toLocaleString()
            });
            payload.mapCodeName[country.alpha2Code] = payload.mapCodeName[country.alpha3Code] = country.name;
        });
        commit('importCountries', payload);
    }
}
