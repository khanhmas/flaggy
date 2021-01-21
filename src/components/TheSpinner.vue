<template>
    <div id="flaggy-spinner">
        <div class="cssload-dot" />
        <div class="cssload-dot" />
        <div class="cssload-dot" />
        <div class="cssload-dot" />
        <div class="cssload-dot" />
        <div class="cssload-dot" />
        <div class="cssload-dot" />
        <div class="cssload-dot" />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        tags: Array,
    },
})
export default class TheSpinner extends Vue {}
</script>
