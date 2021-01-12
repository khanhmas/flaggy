<template>
    <div class="inline-block">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        name: String
    }
})
export default class FlagTag extends Vue {
    name!: string;

};
</script>
<style lang="scss" scoped>

</style>
