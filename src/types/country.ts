import { FlagDetailLabel } from '@/interfaces/flagDetailLabel';

export type Country = FlagDetailLabel & {
    name: string,
    flag: string,
    latlng: [number, number],
    altSpellings: Array<string>,
    nativeName: string,
    alpha2Code: string[2],
    alpha3Code: string[3],
};
