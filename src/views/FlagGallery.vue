<template>
    <section class="text-gray-700 body-font">
        <div class="container px-8 pt-2 mx-auto lg:px-10">
            <div class="flex flex-wrap">
                <router-link v-for="country in countries" :key="country.name" :to="{name: 'Detail', params: getDetailParams(country)}" class="inline-block p-8 lg:w-1/4 md:w-full">
                    <!-- Method 1 -->
                    <FlagCard
                        :flag="country.flag"
                        :name="country.name"
                        :population="country.population"
                        :region="country.region"
                        :capital="country.capital" />
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
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import FlagCard from '@/components/FlagCard.vue';
import { Country } from '@/types/country';
import { FlagDetailLabel } from '@/interfaces/flag_detail_label';
import { FLAG_DETAIL_TEXT_FIELDS } from '@/config/global.config';
import { convert } from '@/utils/country';
// import { mapGetters } from 'vuex';

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
        if (this.countries.length == 0) {
            await this.$store.dispatch('country/fetchCountries');
        }
    }

    mounted(): void {
        // setTimeout(() => {
        //     // if (this.countries.length == 0) {
        //         this.$store.dispatch('country/convertSvgBase64');
        //     // }
        // }, 5000);
    }

    getDetailParams(country: Country): Record<keyof FlagDetailLabel, string | Array<any>> {
        const detailParams: Record<keyof FlagDetailLabel | 'flag', string | Array<any>> = <any>{};
        Object.keys(FLAG_DETAIL_TEXT_FIELDS).forEach((key: string) => {
            const field: keyof FlagDetailLabel = key as keyof FlagDetailLabel;
            if (field !== 'borders')
                detailParams[field] = convert(field, country[field]);
            else detailParams[field] = country[field];
        });
        detailParams['flag'] = country.flag;
        return detailParams;
    }

}
</script>

<style lang="scss" scoped></style>
