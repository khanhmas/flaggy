<template>
    <!-- The key here is used to replay animation when updating the component on the same route
        add transition and the other related classes to customize animation
    -->
    <div class="px-10 py-24 transition duraation-500" :key="alpha3Code">
        <BackButton>
            <template #svg>
                <svg
                    class="absolute top-3 left-2.5"
                    width="20"
                    height="15"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                </svg>
            </template>
            <template #default>
                Back
            </template>
        </BackButton>
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div class="flex items-center justify-center">
                <img
                    class="w-full h-full lg:w-3/4 lg:h-3/4"
                    :src="flag"
                    alt="country"
                />
            </div>
            <div
                class="flex flex-col justify-center p-10 flaggy-frost rounded-3xl"
            >
                <p class="text-3xl font-bold">{{ name }}</p>
                <div class="grid grid-cols-1 gap-4 mt-10 md:grid-cols-2">
                    <div class="info-col-1">
                        <FlagLabelInfo :labelValues="labelValuesCol1" />
                    </div>
                    <div class="info-col-2">
                        <FlagLabelInfo :labelValues="labelValuesCol2" />
                    </div>
                </div>
                <div class="mt-10" v-if="borders.length > 0">
                    <p class="mr-5">Border countries:</p>

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
                                ></p>
                            </template>
                        </FlagTag>
                    </router-link>
                    <!-- <div class="inline-block" v-for="border of borders" :key="border" @click="navigate(border)">
                        <FlagTag>
                            <template #default>
                                <p
                                    v-convertTag:[mapCodeName]="border"
                                    class="inline-block w-20 truncate"
                                ></p>
                            </template>
                        </FlagTag>
                    </div> -->
                    <!-- <FlagTag :tags="borders">
                        <template #default="slotProps">
                            <p
                                v-convertTag:[mapCodeName]="slotProps.tag"
                                class="inline-block w-20 truncate"
                            ></p>
                        </template>
                    </FlagTag> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import FlagTag from '@/components/FlagTag.vue';
import FlagLabelInfo from '@/components/FlagLabelInfo.vue';
import BackButton from '@/components/BackButton.vue';
import { initLabelValues } from '@/utils/utils';
import { FLAG_DETAIL_TEXT_FIELDS } from '@/config/global.config';
import { Country } from '@/types/country';
import { convert } from '@/utils/country';
import convertTag from '@/directives/convertTag';

// Vue.registerHooks([
//     'beforeRouteEnter',
//     'beforeRouteLeave',
//     'beforeRouteUpdate'
// ]);

@Options({
    props: {
        // name: String,
        // population: String,
        // flag: String,
        // nativeName: String,
        // region: String,
        // subregion: String,
        // capital: String,
        // topLevelDomain: String,
        // currencies: String,
        // languages: String,
        // borders: Array,
        // callingCodes: String,
        // alpha2Code: String,
        alpha3Code: String,
    },
    components: {
        FlagTag,
        FlagLabelInfo,
        BackButton,
    },
    directives: {
        convertTag,
    },
})
export default class FlagDetail extends Vue {
    // population!: string;
    // nativeName!: string;
    // region!: string;
    // subregion!: string;
    // capital!: string;
    // topLevelDomain!: string;
    // currencies!: string;
    // languages!: string;
    // callingCodes!: string;
    // alpha2Code!: string;
    alpha3Code!: string;

    name: string = '';
    flag: string = '';
    borders: Array<string> = [];
    labelValuesCol1: Array<{ label: string; value: unknown }> = [];
    labelValuesCol2: Array<{ label: string; value: unknown }> = [];

    get mapCodeName(): { [key: string]: string } {
        return this.$store.getters['country/mapCodeName'];
    }

    /**
     * Fetch country when refreshing, meaning that the properties (ex: name, etc.) will be undefined
     */
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

    async created(): Promise<any> {
        /**
         * TODO: For now, search all countries for the sake of simplicity.
         * TODO: Later on, combine with Suspense and fetch only the country and its borders.
         */
        if (this.$store.getters['country/countries'].length === 0)
            await this.$store.dispatch('country/fetchCountries');
        this.updateCountry();
    }

    // navigate(border: string): void {
    //     console.log(border);
    //     this.$router.push({name: 'Detail', params: {'alpha3Code': border}});
    //     this.$forceUpdate();
    // }

    beforeUpdate(): void {
        this.updateCountry();
    }

    // beforeRouteEnter(to: any, from: any, next: any): void {
    //     console.log('beforeRouteEnter');
    //     console.log(to, from, next);
    //     next((vm: any) => {
    //         console.log(vm);
    //     });
    // }
}
</script>

<style lang="scss" scoped></style>
