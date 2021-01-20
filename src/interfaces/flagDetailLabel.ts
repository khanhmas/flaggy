import { FlagCardLabel } from './flagCardLabel';

export interface FlagDetailLabel extends FlagCardLabel {
    subregion: string;
    topLevelDomain: string;
    languages: Array<{name: string, nativeName: string}>;
    currencies: Array<{code: string, name: string, symbol: string}>,
    borders: Array<string>,
    callingCodes: Array<string>;
}
