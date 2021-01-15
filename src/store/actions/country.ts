import { CountryService } from '@/services/country.service';
import { Country } from '@/types/country';
import { CountryState } from '../states/country';

function buildPayload(countries: Array<Country>): CountryState {
    const payload: CountryState = {
        countries: [],
        mapCodeName: {},
    };
    countries.forEach((country: Country) => {
        payload.countries.push({
            ...country,
            population: Number(country.population).toLocaleString(),
        });
        payload.mapCodeName[country.alpha2Code] = payload.mapCodeName[
            country.alpha3Code
        ] = country.name;
    });
    return payload;
}

export default {
    async fetchCountries({ commit }: { commit: any }): Promise<any> {
        const result: Array<any> = await CountryService.fetchAll();
        const payload: CountryState = buildPayload(result);
        commit('importCountries', payload);
    },
    /**
     * IMPORTANT: the result from searching by name will return an array
     * ex: USA will return a collection of its states
     * Whereas searching from alpha2Code or alpha3Code will return a Country object
     */
    async fetchCountry(
        { commit }: { commit: any },
        route_name: string
    ): Promise<any> {
        const data:
            | Array<Country>
            | Country = await CountryService.fetchByRoute(
            route_name
        );
        const result: Array<Country> = data instanceof Array ? [...data] : [data];
        const payload: CountryState = buildPayload(result);
        commit('importCountries', payload);
    },
};
