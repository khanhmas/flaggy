export function initLabelValues(
    labels: Record<string, string>,
    obj: Record<string, unknown>,
    converter?: (key: any, value: unknown) => string |  Array<unknown>,
    exclude_fields: Array<string> = []
): Array<{ label: string; value: unknown }> {
    const labelValues: Array<{ label: string; value: unknown }> = [];
    const transformValue: (key: any, value: unknown) => string |  Array<unknown> =
        converter != null
            ? converter
            : (key: string, value: unknown): string => value as string;
    Object.entries(labels).forEach(([property, label]: [string, string]) => {
        if (exclude_fields.indexOf(property) === -1) {
            labelValues.push({
                label,
                value: transformValue(property, obj[property]),
            });
        }
    });
    return labelValues;
}

export function scrollNearEnd(offset: number = 1): boolean {
    return (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - offset
    );
}
