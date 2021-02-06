import { Country } from '@/types/country';

export class CountryService {

    /**
     * Point the BASE_URL to the endpoint preprocessed_countries.json on github
     */
    static readonly BASE_URL: string = process.env.VUE_APP_COUNTRY_ENDPOINT;

    static async fetchAll(): Promise<Array<Country>> {
        const response: Response = await fetch(CountryService.BASE_URL);
        if (response.ok === false) {
            throw new Error('problem when fetching all countries');
        }
        return await response.json();
    }

    /**
     * This method is used witgh the https://restcountries.eu/ REST API
     */
    // static async fetchByRoute(name: string): Promise<Array<Country> | Country> {
    //     const response: Response = await fetch(CountryService.BASE_URL + name);
    //     if (response.ok === false) {
    //         throw new Error('problem when fetching from route ' + name);
    //     }
    //     return await response.json();
    // }
}
