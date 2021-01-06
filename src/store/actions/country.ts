import { CountryService } from '@/services/country.service';
import { Country } from '@/types/country';

export default {
    async fetchCountries({ commit }: {commit: any}): Promise<any> {
        const result: Array<any> = await CountryService.fetchAll();
        const countries: Array<Country> = result.map((country: any) => {
            return {
                ...country,
                population: Number(country.population).toLocaleString()
            }
        });
        commit('importCountries', countries);
    }
}
