export class CountryService {

    static readonly BASE_URL: string = 'https://restcountries.eu/rest/v2/';

    static async fetchAll(): Promise<Array<Record<string, any>>> {
        const response: Response = await fetch(CountryService.BASE_URL + 'all');
        if (response.ok === false) {
            throw new Error('problem when fetching all countries');
        }
        return await response.json();
    }
}
