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
