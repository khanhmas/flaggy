<template>
    <div
        v-for="labelValue of labelValues"
        :key="labelValue.label"
        :class="['info-row', truncate === true ? 'truncate' : '', 'info-row--' + labelValue.label]"
    >
        <span
            v-singularPlurial:[labelValue.label]="labelValue.value"
            class="font-semibold"
        />
        <span
            v-convertValue="labelValue.value"
            class="font-extrabold"
        />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import singularPlurial from '@/directives/singularPlurial';
import convertValue from '@/directives/convertValue';

@Options({
    props: {
        labelValues: Array,
        truncate: Boolean
    },
    directives: {
        singularPlurial,
        convertValue,
    },
})
export default class FlagLabelInfo extends Vue {
    truncate: boolean = false;
    labelValues!: Array<{ label: string; value: unknown }>;
}
</script>
<style lang="scss" scoped></style>
