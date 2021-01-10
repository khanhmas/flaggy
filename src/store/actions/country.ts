import { CountryService } from '@/services/country.service';
import { Country } from '@/types/country';
import { CountryState } from '../states/country';

async function fetchSvg(url: string): Promise<any> {
    const response: any = await fetch(url);
    if (response.ok === false) {
        throw new Error('problem when fetching svg ' + url);
    }
    return await response.text();
}

export default {
    async fetchCountries({ commit }: {commit: any}): Promise<any> {
        const result: Array<any> = await CountryService.fetchAll();
        // const countries: Array<any> = result.map(async (country: Country) => {
        //     const res: any = await fetchSvg(country.flag);
        //     return {
        //         ...country,
        //         flag: 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(res))),
        //         population: Number(country.population).toLocaleString()
        //     }
        // });
        // commit('importCountries', await Promise.all(countries));
        const countries: Array<Country> = result.map((country: Country) => {
            return {
                ...country,
                population: Number(country.population).toLocaleString(),
            }
        });
        commit('importCountries', countries);
    },
    async convertSvgBase64({commit, state}: {commit: any, state: CountryState}): Promise<any> {
        const base64_flag_countries: Array<any> = state.countries.map(async (country: Country) => {
            const res: any = await fetchSvg(country.flag);
            return {
                ...country,
                flag: 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(res))),
            }

        })
        commit('importCountries', await Promise.all(base64_flag_countries));
    },
    convertFlagSrcBase64({ commit }: {commit: any}, payload: {name: string, base64: string}): void {
        commit('convertFlagSrcBase64', payload);
    }
}
