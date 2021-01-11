<template>
    <header class="bg-green-100 text-500">
        <h1>hello world</h1>
    </header>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
@Options({
    props: {
        title: String
    }
})
export default class TheHeader extends Vue {
    title!: string;
}
</script>
<style lang="scss">

</style>