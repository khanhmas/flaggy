<template>
    <button class="rounded-full flaggy-frost">
        <a :href="link">
            <slot />
        </a>
    </button>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        link: String
    }
})
export default class PhotoButton extends Vue {
    link!: string;
}
</script>
