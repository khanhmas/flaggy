<template>
    <div class="grid grid-cols-2 gap-4">
        <div class="flex items-center justify-center">
            <img class="w-full h-2/3" src="https://restcountries.eu/data/chn.svg" alt="country" />
        </div>
        <div class="flex flex-col justify-center">
            <p class="text-3xl font-bold">China</p>
            <div class="grid grid-cols-2 gap-4 mt-10">
 
                <div class="info-col-1">

                    <p>aaaaaa: aaaaa</p>
                    <p>aaaaaa: aaaaa</p>
                    <p>aaaaaa: aaaaa</p>
                    <p>aaaaaa: aaaaa</p>
                    <p>aaaaaa: aaaaa</p>
                </div>
                <div class="info-col-1">
                    <p>aaaaaa: aaaaa</p>
                    <p>aaaaaa: aaaaa</p>
                    <p>aaaaaa: aaaaa</p>
                </div>
            </div>
            <div class="flex mt-10">
                <p class="mr-5">Border countries:</p> 
                <!-- <FlagTag :name="'France'" />
                <FlagTag :name="'Netherlands'" />
                <FlagTag :name="'Germany'" /> -->
                <FlagTag />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import FlagTag from '@/components/FlagTag.vue';

@Options({
    props: {
        name: String
    },
    components: {
        FlagTag
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
