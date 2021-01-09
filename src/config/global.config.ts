import { FlagCardLabel } from '@/interfaces/flag_card_label';
import { FlagDetailLabel } from '@/interfaces/flag_detail_label';

export const FLAG_CARD_TEXT_FIELDS: Record<keyof FlagCardLabel, string> = {
    population: 'Population',
    region: 'Region',
    capital: 'Capital'
};

export const FLAG_DETAIL_TEXT_FIELDS: Record<keyof FlagDetailLabel, string> = {
   ...FLAG_CARD_TEXT_FIELDS,
    name: 'Name',
    subregion: 'Subregion',
    topLevelDomain: 'Top Level Domain',
    languages: 'Languages',
    currencies: 'Currencies',
    borders: 'Borders countries',
    callingCodes: 'Calling codes'
};
