import { FlagCardLabel } from './flag_card_label';

export interface FlagDetailLabel extends FlagCardLabel {
    name: string;
    subregion: string;
    topLevelDomain: string;
    languages: Array<{name: string, nativeName: string}>;
    currencies: Array<{code: string, name: string, symbol: string}>,
    borders: Array<string>,
    callingCodes: Array<string>;
}
