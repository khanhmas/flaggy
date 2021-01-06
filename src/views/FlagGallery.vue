<template>
    <section class="text-gray-700 body-font">
        <div class="container px-8 pt-2 mx-auto lg:px-10">
            <div class="flex flex-wrap">
                <FlagCard
                    v-for="country in countries"
                    :key="country.id"
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
import { CountryService } from '@/services/country.service';
import { Country } from '@/types/country';

@Options({
    components: {
        FlagCard
    },
})
export default class FlagGallery extends Vue {

    countries: Array<Country> = [];

    data(): Record<string, any> {
        return {
            countries: []
        };
    }

    async created(): Promise<any> {
        const countries: Array<any> = await CountryService.fetchAll();
        this.countries = countries.map((country: any) => {
            return {
                ...country,
                population: Number(country.population).toLocaleString()
            }
        });
    }
}
</script>

<style lang="scss" scoped></style>
