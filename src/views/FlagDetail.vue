<template>
    <div>Hello Detail</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        name: String
    }
})
export default class FlagDetail extends Vue {
    name!: string;

    created(): void {
        console.log(this.name);
        console.log(this.$route.params.name);
    }
}
</script>

<style lang="scss" scoped></style>
