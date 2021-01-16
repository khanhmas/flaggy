<template>
    <div
        class="inline-block w-24 max-w-md mr-3 text-xs text-center align-middle transition bg-white border border-gray-300 border-solid rounded cursor-pointer hover:bg-gray-200 px-auto"
    >
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        tags: Array,
    },
})
export default class FlagTag extends Vue {
    tags!: Array<string>;
}
</script>
<style lang="scss" scoped></style>
