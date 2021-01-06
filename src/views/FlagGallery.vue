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
// import { mapState } from 'vuex';

@Options({
    components: {
        FlagCard
    },
})
export default class FlagGallery extends Vue {

    // countries: Array<Country> = [];

    data(): Record<string, any> {
        return {
            // ...mapState({
            //     countries: (state: any) => {
            //         console.log(state);
            //         return state.country.country.countries;
            //     }
            // })
            // countries: []
        };
    }

    // computed: any = {
    //     ...mapState({
    //         countries: (state: any) => {
    //             console.log(state);
    //             return state.country.country.countries;
    //         }
    //     })
    // }

    get countries(): Array<Country> {
        console.log(this.$store.getters);
        return this.$store.getters.getAllCountries;
    }

    created(): void{
        this.$store.dispatch('fetchCountries');
        // this.countries =this.$store.state
        // console.log(this.$store.getters);
        // console.log(this.$store);
    }

}
</script>

<style lang="scss" scoped></style>
