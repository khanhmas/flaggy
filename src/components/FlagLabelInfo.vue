<template>
    <div
        :class="['info-row', 'info-row--' + labelValue.label]"
        v-for="labelValue of labelValues"
        :key="labelValue.label"
    >
        <span
            class="font-semibold"
            v-singularPlurial:[labelValue.label]="labelValue.value"
        ></span>
        <span class="font-extrabold" v-convertValue="labelValue.value"></span>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import singularPlurial from '@/directives/singularPlurial';
import convertValue from '@/directives/convertValue';

@Options({
    props: {
        labelValues: Array,
    },
    directives: {
        singularPlurial,
        convertValue,
    },
})
export default class FlagLabelInfo extends Vue {
    labelValues!: Array<{ label: string; value: unknown }>;
}
</script>
<style lang="scss" scoped></style>
