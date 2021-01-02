<template>
    <section class="text-gray-700 body-font">
        <div class="container px-8 pt-2 mx-auto lg:px-10">
            <div class="flex flex-wrap">
                <FlagCard
                    v-for="country in countries"
                    :key="country.id"
                    :flag="country.flag"
                    :name="country.name"></FlagCard>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import FlagCard from '@/components/FlagCard.vue';

@Options({
    components: {
        FlagCard
    },
    data() {
        return {
            countries: [
                {id: 1, name: 'China', flag: 'https://restcountries.eu/data/chn.svg'},
                {id: 2, name: 'China', flag: 'https://restcountries.eu/data/chn.svg'},
                {id: 3, name: 'China', flag: 'https://restcountries.eu/data/chn.svg'},
                {id: 4, name: 'China', flag: 'https://restcountries.eu/data/chn.svg'},
                {id: 5, name: 'China', flag: 'https://restcountries.eu/data/chn.svg'},
            ]
        };
    }
})
export default class FlagGallery extends Vue {}
</script>

<style lang="scss" scoped></style>
