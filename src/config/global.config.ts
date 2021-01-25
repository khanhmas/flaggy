import { Country } from '@/types/country';
import { FlagCardLabel } from '@/interfaces/flagCardLabel';
import { FlagDetailLabel } from '@/interfaces/flagDetailLabel';

export interface TabMetadata {
    label: string;
    componentName: string;
    default?: boolean;
}

export const TABS: Array<TabMetadata> = [
    {label: 'Information', componentName: 'DetailInfo', default: true},
    {label: 'Landscapes', componentName: 'PhotoGallery'},
];

export const PHOTO_CATEGORY: string = 'landscapes';
export const ADDITIONAL_QUERY_PARAMS: Record<string, string> = {
    'utm_source': 'flaggy',
    'utm_medium': 'referral'
}

export const LIGHT_MODE_LABEL: string = 'Light mode';
export const DARK_MODE_LABEL: string = 'Dark mode';

export const FLAG_CARD_TEXT_FIELDS: Record<keyof FlagCardLabel, string> = {
    population: 'Population',
    region: 'Region',
    capital: 'Capital',
    altSpellings: 'Alternative name',
};

export const FLAG_DETAIL_TEXT_FIELDS: Record<keyof FlagDetailLabel, string> = {
    ...FLAG_CARD_TEXT_FIELDS,
    subregion: 'Subregion',
    topLevelDomain: 'Top Level Domain',
    languages: 'Language',
    currencies: 'Currency',
    borders: 'Border country',
    callingCodes: 'Calling code',
};

export const FILTER_COUNTRY_OPTIONS: Array<{label: string, searchField: keyof Country}> = [
    /**
     * The first element is the default filter
     */
    {label: 'Name', searchField: 'name'},
    {label: 'Alternative name', searchField: 'altSpellings'},
    {label: 'Language', searchField: 'languages'},
    {label: 'Region', searchField: 'region'},
    {label: 'Subregion', searchField: 'subregion'},
];
