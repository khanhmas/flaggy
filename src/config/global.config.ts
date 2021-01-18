import { Country } from './../types/country';
import { FlagCardLabel } from '@/interfaces/flag_card_label';
import { FlagDetailLabel } from '@/interfaces/flag_detail_label';

export const FLAG_CARD_TEXT_FIELDS: Record<keyof FlagCardLabel, string> = {
    population: 'Population',
    region: 'Region',
    capital: 'Capital',
};

export const FLAG_DETAIL_TEXT_FIELDS: Record<keyof FlagDetailLabel, string> = {
    ...FLAG_CARD_TEXT_FIELDS,
    name: 'Name',
    subregion: 'Subregion',
    topLevelDomain: 'Top Level Domain',
    languages: 'Language',
    currencies: 'Currency',
    borders: 'Border country',
    callingCodes: 'Calling code',
};

export const FILTER_COUNTRY_OPTIONS: Array<{label: string, searchField: keyof Country}> = [
    {label: 'Name', searchField: 'altSpellings'},
    {label: 'Languages', searchField: 'languages'},
    {label: 'Region', searchField: 'region'},
    {label: 'Subregion', searchField: 'subregion'},
];
