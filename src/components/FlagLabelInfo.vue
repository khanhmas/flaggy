<template>
    <div :class="[
        'info-row',
        'info-row--' + labelValue.label
    ]" v-for="labelValue of labelValues" :key="labelValue.label">
        <span class="font-semibold capitalize">{{labelValue.label}}: </span>
        <span>{{ labelValue.value }}</span>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        labelValues: Array
    }
})
export default class FlagLabelInfo extends Vue {
    labelValues!: Array<Record<string, string>>;

};
</script>
<style lang="scss" scoped>

</style>
