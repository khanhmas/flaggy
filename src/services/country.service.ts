import { Country } from '@/types/country';

export class CountryService {

    static readonly BASE_URL: string = process.env.VUE_APP_COUNTRY_ENDPOINT;

    static async fetchAll(): Promise<Array<Country>> {
        const response: Response = await fetch(CountryService.BASE_URL + 'all');
        if (response.ok === false) {
            throw new Error('problem when fetching all countries');
        }
        return await response.json();
    }

    static async fetchByRoute(name: string): Promise<Array<Country> | Country> {
        const response: Response = await fetch(CountryService.BASE_URL + name);
        if (response.ok === false) {
            throw new Error('problem when fetching from route ' + name);
        }
        return await response.json();
    }
}
