import { Country } from '@/types/country';

export function convert(
    field: keyof Country,
    value: unknown
): string | Array<unknown> {
    if (value instanceof Array)
        return processArrayValue(field, value as Array<unknown>);
    return value as string;
}

function processArrayValue(
    field: keyof Country,
    value: Array<unknown>
): Array<unknown> {
    let res: Array<unknown> = [];
    switch (field) {
        case 'languages': {
            const languages: Array<Record<string, string>> = value as Array<
                Record<string, string>
            >;
            res = [
                ...new Set(
                    languages
                        .map((language: Record<string, string>) =>
                            Object.values(language)
                        )
                        .flat()
                        .filter((language: string) => language != null)
                ),
            ];
            break;
        }
        case 'currencies': {
            const currencies: Array<{
                name: string;
                symbol: string;
            }> = value as Array<{ symbol: string; name: string }>;
            res = [
                ...new Set(
                    currencies.map(
                        (currency: { symbol: string; name: string }) =>
                            currency.symbol != null
                                ? currency.symbol
                                : currency.name
                    )
                ),
            ];
            break;
        }
        default:
            res = value;
            break;
    }
    return res;
}
