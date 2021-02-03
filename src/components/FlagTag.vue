<template>
    <div
        class="text-xs text-center align-middle transition bg-white border border-gray-300 border-solid rounded cursor-pointer"
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
