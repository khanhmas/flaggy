import { FlagDetailLabel } from '@/interfaces/flagDetailLabel';

export type Country = FlagDetailLabel & {
    name: string,
    flag: string,
    latlng: [number, number],
    altSpellings: Array<string>,
    nativeName: string,
    alpha2Code: string[2],
    alpha3Code: string[3],
    // custom types
    populationHistory: {
        years: Array<number>,
        population: Array<number>
    },
    linearGradients: string,
    _highlightResult: Record<string, any>, // algolia attribute
};
