<template>
    <section class="text-gray-700 body-font">
        <div class="container p-24 px-8 mx-auto lg:px-10">
            <div
                class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 lg:gap-8 xl:gap-12"
            >
                <transition-group
                    name="scale"
                    mode="in-out"
                    enter-from-class="scale-0 opacity-0"
                    enter-active-class="transition duration-1000 ease-out transform"
                    enter-to-class="scale-100 opacity-1"
                >
                    <router-link
                        v-for="country in animated_countries"
                        :key="country.name"
                        :to="{
                            name: 'Detail',
                            params: getDetailParams(country),
                        }"
                        class="w-full"
                    >
                        <!-- Method 1 -->
                        <FlagCard
                            :flag="country.flag"
                            :name="country.name"
                            :population="country.population"
                            :region="country.region"
                            :capital="country.capital"
                        />
                        <!-- Method 2-->
                        <!-- <keep-alive>
                        <component :is="'FlagCard'"
                        v-for="country in countries"
                        :key="country.name"
                        :flag="country.flag"
                        :name="country.name"
                        :population="country.population"
                        :region="country.region"
                        :capital="country.capital"></component>
                    </keep-alive>
                    -->
                    </router-link>
                </transition-group>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import FlagCard from '@/components/FlagCard.vue';
import { Country } from '@/types/country';
// import { FlagDetailLabel } from '@/interfaces/flag_detail_label';
// import { FLAG_DETAIL_TEXT_FIELDS } from '@/config/global.config';
// import { convert } from '@/utils/country';
// import { mapGetters } from 'vuex';

@Options({
    components: {
        FlagCard,
    },
    // Method 1: use mapGetters to get countries
    // computed: mapGetters({
    //     countries: 'country/countries'
    // }),
})
export default class FlagGallery extends Vue {
    // countries!: Array<Country>;

    animated_countries: Array<Country> = [];

    // Method 2: access getters through $store to get countries
    get countries(): Array<Country> {
        return this.$store.getters['country/countries'];
    }

    async created(): Promise<any> {
        if (this.countries.length == 0)
            await this.$store.dispatch('country/fetchCountries');
        this.animateCountries();
    }

    private animateCountries(): void {
        this.countries.forEach((country: Country, index: number) => {
            const timeout: number = setTimeout(() => {
                this.animated_countries.push(country);
                clearTimeout(timeout);
            }, 200*index);
        });
    }

    getDetailParams(
        country: Country
    ): Record<keyof Country, string | Array<any>> {
        const detailParams: Record<keyof Country, string | Array<any>> = <
            any
        >{};
        // Object.keys(FLAG_DETAIL_TEXT_FIELDS).forEach((key: string) => {
        //     const field: keyof FlagDetailLabel = key as keyof FlagDetailLabel;
        //     if (field !== 'borders')
        //         detailParams[field] = convert(field, country[field]);
        //     else detailParams[field] = country[field];
        // });
        // detailParams['flag'] = country.flag;
        // detailParams['alpha2Code'] = country.alpha2Code;
        detailParams['alpha3Code'] = country.alpha3Code;

        return detailParams;
    }
}
</script>

<style lang="scss" scoped></style>
