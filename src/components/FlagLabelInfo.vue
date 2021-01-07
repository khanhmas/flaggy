<template>
    <div :class="[
        'info-row',
        'info-row--' + label
    ]" v-for="(value, label) in label_values" :key="label">
        <span class="font-semibold capitalize">{{label}}: </span>
        <span>{{ value }}</span>
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
