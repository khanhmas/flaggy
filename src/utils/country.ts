import { FlagDetailLabel } from '@/interfaces/flag_detail_label';

export function convert(
    field: keyof FlagDetailLabel,
    value: unknown
): string | Array<unknown> {
    if (value instanceof Array)
        return processArrayValue(field, value as Array<unknown>);
    return value as string;
}

function processArrayValue(
    field: keyof FlagDetailLabel,
    value: Array<unknown>
): Array<unknown> {
    let res: Array<unknown> = [];
    switch (field) {
        case 'languages': {
            const languages: Array<{
                nativeName: string;
            }> = value as Array<{ nativeName: string }>;
            res = languages.map(
                (language: { nativeName: string }) => language.nativeName
            );
            break;
        }
        case 'currencies': {
            const currencies: Array<{
                name: string,
                symbol: string
            }> = value as Array<{ symbol: string; name: string }>;
            res = currencies.map((currency: { symbol: string; name: string }) =>
                currency.symbol != null ? currency.symbol : currency.name
            );
            break;
        }
        default:
            res = value;
            break;
    }
    return res;
}
