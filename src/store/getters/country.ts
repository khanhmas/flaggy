import { CountryState } from '@/store/states/country';
import { Country } from '@/types/country';
import { convert } from '@/utils/country';

function existValueInArray(
    names: Array<string>,
    lowerCaseValue: string
): boolean {
    const lowerNames: Array<string> = names.map((name: string) =>
        name.toLowerCase()
    );
    return lowerNames.some((lowerName: string) =>
        lowerName.includes(lowerCaseValue)
    );
}

export default {
    countries(state: CountryState): Array<Country> {
        return state.countries;
    },
    mapCodeName(state: CountryState): { [key: string]: string } {
        return state.mapCodeName;
    },
    countryBy: (state: CountryState) => ([field, value]: [keyof Country, any]):
        | Country
        | undefined => {
        return state.countries.find((country: Country) => {
            return country[field] === value;
        });
    },
    filterCountries: (state: CountryState) => ([field, value]: [
        keyof Country,
        string
    ]): Array<Country> => {
        return state.countries.filter((country: Country) => {
            const lowerCaseValue: string = value.toLowerCase().trim();
            if (country[field] instanceof Array) {
                return existValueInArray(
                    convert(field, country[field]) as Array<string>,
                    lowerCaseValue
                );
            } else if (typeof country[field] === 'string') {
                return (
                    (country[field] as string).toLowerCase().replaceAll('-', ' ').includes(lowerCaseValue)
                );
            }
            return country[field] === value;
        });
    },
};
