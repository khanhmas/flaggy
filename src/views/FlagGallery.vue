<template>
    <section class="text-gray-700 body-font">
        <div class="container px-8 pt-2 mx-auto lg:px-10">
            <div class="flex flex-wrap">
                <FlagCard
                    v-for="country in countries"
                    :key="country.name"
                    :flag="country.flag"
                    :name="country.name"
                    :population="country.population"
                    :region="country.region"
                    :capital="country.capital" />
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import FlagCard from '@/components/FlagCard.vue';
import { Country } from '@/types/country';
import { mapGetters } from 'vuex';

@Options({
    components: {
        FlagCard
    },
    // Method 1: use mapGetters to get countries
    // computed: mapGetters({
    //     countries: 'country/countries'
    // }),

})
export default class FlagGallery extends Vue {
    // countries!: Array<Country>;

    // Method 2: access getters through $store to get countries
    get countries(): Array<Country> {
        return this.$store.getters['country/countries'];
    }

    async created(): Promise<any> {
        await this.$store.dispatch('country/fetchCountries');
    }

}
</script>

<style lang="scss" scoped></style>
