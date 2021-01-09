import { FlagDetailLabel } from '@/interfaces/flag_detail_label';

export function initLabelValues(
    labels: Record<string, string>,
    obj: Record<string, unknown>,
    exclude_fields: Array<string> = []
): Array<{ label: string; value: unknown }> {
    const labelValues: Array<{ label: string; value: unknown }> = [];
    Object.entries(labels).forEach(([property, label]: [string, string]) => {
        if (exclude_fields.indexOf(property) === -1) {
            labelValues.push({
                label,
                value: obj[property],
            });
        }
    });
    return labelValues;
}

export function convert(field: keyof FlagDetailLabel, value: unknown): string {
    if (value instanceof Array)
        return processArrayValue(field, value as Array<unknown>);
    return value as string;
}

function processArrayValue(field: keyof FlagDetailLabel, value: Array<unknown>): string {
    let res = '';
    switch (field) {
        case 'languages': {
            const languages: Array<{
                nativeName: string
            }> = value as Array<{ nativeName: string }>;
            res = languages
                .map((language: { nativeName: string }) => language.nativeName)
                .join(', ');
            break;
        }
        case 'currencies': {
            const currencies: Array<{
                symbol: string
            }> = value as Array<{ symbol: string }>;
            res = currencies
                .map((currency: { symbol: string }) => currency.symbol)
                .join(', ');
            break;
        }
        default:
            res = value.join(', ');
            break;
    }
    return res;
}
