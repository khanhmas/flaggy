import { Country } from '@/types/country';

export type CountryState = {
    countries: Array<Country>,
    mapCodeName: {[key: string]: string},
};
