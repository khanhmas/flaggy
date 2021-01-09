<template>
    <div
        :class="['info-row', 'info-row--' + labelValue.label]"
        v-for="labelValue of labelValues"
        :key="labelValue.label"
    >
        <span class="font-semibold capitalize">{{ labelValue.label }}: </span>
        <span>{{ convert(labelValue) }}</span>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        labelValues: Array,
    },
})
export default class FlagLabelInfo extends Vue {
    labelValues!: Array<{ label: string; value: unknown }>;

    convert(labelValue: { label: string; value: unknown }): string {
        if (labelValue.value instanceof Array)
            return this.processArrayValue(labelValue as { label: string, value: Array<unknown> });
        return labelValue.value as string;
    }

    private processArrayValue(labelValue: { label: string; value: Array<unknown> }): string {
        let res = '';
        const value: Array<unknown> = labelValue.value;
        const field: string = labelValue.label.toLowerCase();
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
        }
        console.log(labelValue.label, res);
        return res;
    }
}
</script>
<style lang="scss" scoped></style>
