<template>
    <TheSpinner v-if="countries.length === 0 || flag === ''" />
    <div v-else class="grid grid-cols-1 gap-4 mt-10 lg:grid-cols-2">
        <div class="flex items-center justify-center">
            <img
                class="w-full h-full lg:w-3/4 lg:h-3/4"
                :src="flag"
                alt="country"
            />
        </div>
        <div
            class="flex flex-col justify-center p-10 transition-colors duration-700 ease-in-out flaggy-frost rounded-3xl"
        >
            <p class="text-3xl font-bold dark:text-white">
                {{ name }}
            </p>
            <div class="grid grid-cols-1 gap-4 mt-10 md:grid-cols-2">
                <div class="info-col-1">
                    <FlagLabelInfo :label-values="labelValuesCol1" />
                </div>
                <div class="info-col-2">
                    <FlagLabelInfo :label-values="labelValuesCol2" />
                </div>
            </div>
            <div v-if="borders.length > 0" class="mt-10">
                <p
                    v-singularPlurial:[borderCountryLabel]="borders"
                    class="mr-5 dark:text-white"
                />

                <router-link
                    v-for="border of borders"
                    :key="border"
                    :to="{ name: 'Detail', params: { alpha3Code: border } }"
                >
                    <FlagTag>
                        <template #default>
                            <p
                                v-convertTag:[mapCodeName]="border"
                                class="inline-block w-20 truncate"
                            />
                        </template>
                    </FlagTag>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import FlagTag from '@/components/FlagTag.vue';
import FlagLabelInfo from '@/components/FlagLabelInfo.vue';
import { initLabelValues } from '@/utils/utils';
import { FLAG_DETAIL_TEXT_FIELDS } from '@/config/global.config';
import { Country } from '@/types/country';
import { convert } from '@/utils/country';
import convertTag from '@/directives/convertTag';
import singularPlurial from '@/directives/singularPlurial';
import TheSpinner from '@/components/TheSpinner.vue';

@Options({
    props: {
        alpha3Code: String,
    },
    components: {
        FlagTag,
        FlagLabelInfo,
        TheSpinner
    },
    directives: {
        convertTag,
        singularPlurial,
    },
})
export default class FlagDetail extends Vue {
    alpha3Code!: string;

    borderCountryLabel: string = FLAG_DETAIL_TEXT_FIELDS.borders;
    name: string = '';
    flag: string = '';
    borders: Array<string> = [];
    labelValuesCol1: Array<{ label: string; value: unknown }> = [];
    labelValuesCol2: Array<{ label: string; value: unknown }> = [];

    get mapCodeName(): { [key: string]: string } {
        return this.$store.getters['country/mapCodeName'];
    }

    get countries(): Array<Country> {
        return this.$store.getters['country/countries'];
    }

    async created(): Promise<any> {
        window.scrollTo(0, 0);
        if (this.countries.length === 0)
            await this.$store.dispatch('country/fetchCountries');
        this.updateCountry();
    }

    beforeUpdate(): void {
        window.scrollTo(0, 0);
        this.updateCountry();
    }

    async tryFetchCountry(): Promise<any> {
        if (this.alpha3Code in this.mapCodeName === false) {
            /**
             * The route name can also be by name
             * CF: https://restcountries.eu/#api-endpoints-name
             * Searching by alpha3Code or alpha2Code will return the exact Country object
             */
            const route_name: string = 'alpha/' + this.alpha3Code;
            await this.$store.dispatch('country/fetchCountry', route_name);
        }
    }

    private updateCountry(): void {
        const country: Country = this.$store.getters['country/countryBy']([
            'alpha3Code',
            this.alpha3Code,
        ]);
        this.name = country.name;
        this.flag = country.flag;
        this.borders = country.borders;
        const labelValues: Array<{
            label: string;
            value: unknown;
        }> = initLabelValues(
            FLAG_DETAIL_TEXT_FIELDS,
            country as Record<keyof Country, unknown>,
            convert,
            ['borders']
        );
        this.labelValuesCol1 = labelValues.slice(0, 6);
        this.labelValuesCol2 = labelValues.slice(6);
    }
}
</script>

<style lang="scss" scoped></style>
