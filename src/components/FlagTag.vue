<template>
    <div
        class="inline-block max-w-md px-1 text-xs text-center align-middle transition bg-white border border-gray-300 border-solid rounded cursor-pointer w-22"
    >
        <slot />
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
