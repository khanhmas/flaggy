<template>
    <div
        :class="['info-row', 'info-row--' + labelValue.label]"
        v-for="labelValue of labelValues"
        :key="labelValue.label"
    >
        <span class="font-semibold">{{ labelValue.label }}: </span>
        <span class="font-extrabold">{{ labelValue.value }}</span>
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
}
</script>
<style lang="scss" scoped></style>
