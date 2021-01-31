import { Country } from '@/types/country';
import { FlagCardLabel } from '@/interfaces/flagCardLabel';
import { FlagDetailLabel } from '@/interfaces/flagDetailLabel';

export interface TabMetadata {
    label: string;
    componentName: string;
    photoCategory?: string;
    default?: boolean;
}

export const TABS: Array<TabMetadata> = [
    {label: 'Information', componentName: 'DetailInfo', default: true},
    {label: 'Landscapes', componentName: 'PhotoGallery', photoCategory: 'landscapes'},
    {label: 'Food', componentName: 'PhotoGallery', photoCategory: 'food'},
];

export const PHOTO_PROVIDER: Record<string, string> = {
    name: 'Unsplash',
    domain: 'https://unsplash.com'
};
export const ATTRIBUTION_QUERY_PARAMS: Record<string, string> = {
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
    countryCodes: 'Country code',
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
    {label: 'Name', searchField: 'altSpellings'},
    {label: 'Language', searchField: 'languages'},
    {label: 'Country code', searchField: 'countryCodes'},
    {label: 'Region', searchField: 'region'},
    {label: 'Subregion', searchField: 'subregion'},
];
