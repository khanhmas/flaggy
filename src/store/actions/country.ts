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

// export default {
//     async fetchCountries({ commit }: {commit: any}): Promise<any> {
//         const result: Array<any> = await CountryService.fetchAll();
//         // const countries: Array<any> = result.map(async (country: Country) => {
//         //     const res: any = await fetchSvg(country.flag);
//         //     return {
//         //         ...country,
//         //         flag: 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(res))),
//         //         population: Number(country.population).toLocaleString()
//         //     }
//         // });
//         // commit('importCountries', await Promise.all(countries));
//         const countries: Array<Country> = result.map((country: Country) => {
//             return {
//                 ...country,
//                 population: Number(country.population).toLocaleString(),
//             }
//         });
//         commit('importCountries', countries);
//     },
//     async convertSvgBase64({commit, state}: {commit: any, state: CountryState}): Promise<any> {
//         const base64_flag_countries: Array<any> = state.countries.map(async (country: Country) => {
//             const res: any = await fetchSvg(country.flag);
//             return {
//                 ...country,
//                 flag: 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(res))),
//             }

//         })
//         commit('importCountries', await Promise.all(base64_flag_countries));
//     },
//     convertFlagSrcBase64({ commit }: {commit: any}, payload: {name: string, base64: string}): void {
//         commit('convertFlagSrcBase64', payload);
//     }

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
    async convertSvgBase64({
        commit,
        state,
    }: {
        commit: any;
        state: CountryState;
    }): Promise<any> {
        const base64_flag_countries: Array<any> = state.countries.map(
            async (country: Country) => {
                const res: any = await fetchSvg(country.flag);
                return {
                    ...country,
                    flag:
                        'data:image/svg+xml;base64,' +
                        window.btoa(unescape(encodeURIComponent(res))),
                };
            }
        );
        commit('importCountries', await Promise.all(base64_flag_countries));
    },
    convertFlagSrcBase64(
        { commit }: { commit: any },
        payload: { name: string; base64: string }
    ): void {
        commit('convertFlagSrcBase64', payload);
    },
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
            | Country = await CountryService.fetchByRoute(route_name);
        const result: Array<Country> =
            data instanceof Array ? [...data] : [data];
        const payload: CountryState = buildPayload(result);
        commit('importCountries', payload);
    },
};
