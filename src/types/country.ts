import { FlagDetailLabel } from '@/interfaces/flagDetailLabel';

export type a = FlagDetailLabel & {'a': 'b'};

export type Country = FlagDetailLabel & {
    // name: string,
    // population: string,
    // region: string,
    // capital: string,
    // topLevelDomain: string,
    // subregion: string,
    // currencies: Array<{code: string, name: string, symbol: string}>,
    // borders: Array<string>,
    name: string,
    flag: string,
    latlng: [number, number],
    altSpellings: Array<string>,
    nativeName: string,
    alpha2Code: string[2],
    alpha3Code: string[3],
};
