export function initLabelValues(
    labels: Record<string, string>,
    obj: Record<string, unknown>
): Array<{ label: string; value: unknown }> {
    const labelValues: Array<{ label: string; value: unknown }> = [];
    Object.entries(labels).forEach(([property, label]: [string, string]) => {
        labelValues.push({
            label,
            value: obj[property],
        });
    });
    return labelValues;
}
