<template>
    <div :class="[
        'info-row',
        'info-row--' + label_value.label
    ]" v-for="label_value of label_values" :key="label_value.label">
        <span class="font-semibold capitalize">{{label_value.label}}: </span>
        <span>{{ label_value.value }}</span>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        label_values: Object
    }
})
export default class FlagLabelInfo extends Vue {
    label_values!: Record<string, string>;

};
</script>
<style lang="scss" scoped>

</style>
