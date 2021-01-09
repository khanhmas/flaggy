import { FlagDetailLabel } from '@/interfaces/flag_detail_label';

export type a = FlagDetailLabel & {'a': 'b'};

export type Country = FlagDetailLabel & {
    // name: string,
    // flag: string,
    // population: string,
    // region: string,
    // capital: string,
    // topLevelDomain: string,
    // subregion: string,
    // currencies: Array<{code: string, name: string, symbol: string}>,
    // borders: Array<string>,
    latlng: [number, number],
    altSpellings: Array<string>,
    nativeName: string,
};
