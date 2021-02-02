<template>
    <div class="mt-6">
        <TheSpinner v-if="isValidCountry() === false || country?.flag === ''" />
        <div v-else class="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div class="flex items-center justify-center">
                <!-- <img
                class="w-full h-full lg:w-3/4 lg:h-3/4"
                :src="country?.flag"
                alt="country"
            /> -->
                <TheSpinner
                    v-if="leaflet === null || geojson === null"
                    class="small"
                />
                <TheMap
                    v-else
                    :geo-json="geojson"
                    :leaflet="leaflet"
                    :country="country"
                />
            </div>
            <div
                class="flex flex-col justify-center p-10 transition-colors duration-700 ease-in-out flaggy-frost rounded-3xl"
            >
                <p class="text-3xl font-bold dark:text-white">
                    {{ country?.name }}
                </p>
                <div class="grid grid-cols-1 gap-4 mt-10 md:grid-cols-2">
                    <div class="info-col-1">
                        <FlagLabelInfo :label-values="labelValuesCol1" />
                    </div>
                    <div class="info-col-2">
                        <FlagLabelInfo :label-values="labelValuesCol2" />
                    </div>
                </div>
                <div v-if="country?.borders?.length > 0" class="mt-10">
                    <p
                        v-singularPlurial:[borderCountryLabel]="
                            country?.borders
                        "
                        class="mr-5 dark:text-white"
                    />

                    <router-link
                        v-for="border of country?.borders"
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
import TheMap from '@/components/elements/TheMap.vue';

@Options({
    props: {
        country: Object,
    },
    components: {
        FlagTag,
        FlagLabelInfo,
        TheSpinner,
        TheMap,
    },
    directives: {
        convertTag,
        singularPlurial,
    },
})
export default class FlagDetail extends Vue {
    country!: Country;

    borderCountryLabel: string = FLAG_DETAIL_TEXT_FIELDS.borders;
    labelValuesCol1: Array<{ label: string; value: unknown }> = [];
    labelValuesCol2: Array<{ label: string; value: unknown }> = [];

    leaflet: Record<string, unknown> | null = null;
    geojson: Record<string, unknown> | null = null;

    get mapCodeName(): { [key: string]: string } {
        return this.$store.getters['country/mapCodeName'];
    }

    created(): void {
        this.setCountryInfo();
        this.lazyLoadMapTools();
    }

    beforeUpdate(): void {
        this.setCountryInfo();
    }

    private async lazyLoadMapTools(): Promise<any> {
        if (
            this.$store.hasModule('geojson') === false &&
            this.$store.hasModule('leaflet') === false
        ) {
            const leaflet: Record<string, any> = await import(
                'leaflet/dist/leaflet-src.esm'
            );
            delete leaflet.Icon.Default.prototype._getIconUrl;
            leaflet.Icon.Default.mergeOptions({
                iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
                iconUrl: require('leaflet/dist/images/marker-icon.png'),
                shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
            });
            this.$store.registerModule('leaflet', {
                state: leaflet,
            });
            const res: any = await fetch(
                // 'https://s3.amazonaws.com/rawstore.datahub.io/23f420f929e0e09c39d916b8aaa166fb.geojson'
                'https://raw.githubusercontent.com/khanhmas/world.geo.json/master/countries.geo.json'
            );
            const json: any = await res.json();
            this.$store.registerModule('geojson', {
                state: json,
            });
        }
        this.geojson = this.$store.state['geojson'];
        this.leaflet = this.$store.state['leaflet'];
    }

    isValidCountry(): boolean {
        return Object.keys(this.country).length > 0;
    }

    private setCountryInfo(): void {
        /**
         * IMPORTANT: The default country object is an empty object before the Country REST API returned the response
         * If we don't check the condition below, the "value" key in 2 object "labelValuesCol1" and "labelValuesCol2"
         * will be filled with "undefined" in the first place, therefore, the "mounted" hook in the
         * convertValue directive will be executed and fill in those "undefined" values by default.
         *
         * After that, when the countries objects are fetched from the REST Countries API, the "beforeUpdate" hook
         * in the convertValue directive wil be executed to fill in the new values
         * => Problem: This will duplicate the logic in the mounted hook
         *
         * Solution: only fill in the 2 objects labelValuesCol1" and "labelValuesCol2"
         * with the meaningfull values right away in the "mounted" hook (only exucuted once during the whole lifecycle) to fill the undefined values
         */
        if (this.isValidCountry() === true) {
            const labelValues: Array<{
                label: string;
                value: unknown;
            }> = initLabelValues(
                FLAG_DETAIL_TEXT_FIELDS,
                this.country as Record<keyof Country, unknown>,
                convert,
                ['borders']
            );
            this.labelValuesCol1 = labelValues.slice(0, 6);
            this.labelValuesCol2 = labelValues.slice(6);
        }
    }

    // async tryFetchCountry(): Promise<any> {
    //     if (this.alpha3Code in this.mapCodeName === false) {
    //         /**
    //          * The route name can also be by name
    //          * CF: https://restcountries.eu/#api-endpoints-name
    //          * Searching by alpha3Code or alpha2Code will return the exact Country object
    //          */
    //         const route_name: string = 'alpha/' + this.alpha3Code;
    //         await this.$store.dispatch('country/fetchCountry', route_name);
    //     }
    // }
}
</script>
