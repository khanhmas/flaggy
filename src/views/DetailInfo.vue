<template>
    <div
        class="transition duration-700 ease-in-out md:mt-6"
        :key="country?.alpha3Code"
    >
        <TheSpinner v-if="isValidCountry() === false || country?.flag === ''" />
        <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <!--
                Need to add col-span-2 md:col-span-1 so that the map can have a defined width
                This is due to the col-span-2 in the FlagChart container below
            -->
            <div class="flex items-center justify-center col-span-2 md:col-span-1">
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
                class="flex flex-col justify-center col-span-2 p-10 transition-colors duration-700 ease-in-out md:col-span-1 flaggy-frost rounded-3xl"
            >
                <p class="text-3xl font-bold dark:text-white">
                    <img
                        width="32"
                        height="32"
                        :src="country?.flag"
                        alt="country"
                        class="inline align-baseline"
                    />
                    <span class="ml-2">{{ country?.name }}</span>
                </p>
                <div class="detail-info-text" :style="textStyles">
                    <div class="grid grid-cols-1 gap-4 mt-10 md:grid-cols-2">
                        <div class="info-col-1">
                            <FlagLabelInfo :label-values="labelValuesCol1" />
                        </div>
                        <div class="info-col-2">
                            <FlagLabelInfo :label-values="labelValuesCol2" />
                        </div>
                    </div>
                </div>
                <div v-if="country?.borders?.length > 0" class="mt-6">
                    <p
                        v-singularPlurial:[borderCountryLabel]="
                            country?.borders
                        "
                        class="mr-5 dark:text-white"
                    />
                    <div
                        class="grid grid-flow-row-dense grid-cols-2 gap-3 mt-2 sm:grid-cols-5 md:grid-cols-3 xl:grid-cols-5"
                    >
                        <router-link
                            v-for="border of country?.borders"
                            :key="border"
                            :to="{
                                name: 'Detail',
                                params: { alpha3Code: border },
                            }"
                        >
                            <FlagTag
                                @mouseover="onTagHover(border)"
                                @mouseleave="onTagLeave()"
                                :class="[
                                    activeTag === border ? 'bg-green-300' : '',
                                ]"
                            >
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
            <div
                class="col-span-2"
                v-if="
                    country?.populationHistory.years.length > 0 &&
                        country?.populationHistory.population.length > 0
                "
            >
                <component
                    :is="componentInstance"
                    :years="country?.populationHistory.years"
                    :population="country?.populationHistory.population"
                />
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
import { CountryMap } from '@/classes/map';

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
export default class DetailInfo extends Vue {
    country!: Country;

    borderCountryLabel: string = FLAG_DETAIL_TEXT_FIELDS.borders;
    labelValuesCol1: Array<{ label: string; value: unknown }> = [];
    labelValuesCol2: Array<{ label: string; value: unknown }> = [];

    leaflet: Record<string, unknown> | null = null;
    geojson: Record<string, unknown> | null = null;
    activeTag: string = '';
    componentInstance: any = null;
    textStyles: Record<string, string> = {};

    get mapCodeName(): { [key: string]: string } {
        return this.$store.getters['country/mapCodeName'];
    }

    created(): void {
        this.setCountryInfo();
        this.lazyLoadMapTools();
        CountryMap.subscribe(this.setActiveTag.bind(this));
    }

    async mounted(): Promise<void> {
        const value: any = await import('@/components/elements/FlagChart.vue');
        this.componentInstance = value.default;
    }

    beforeUpdate(): void {
        this.setCountryInfo();
    }

    beforeUnmount(): void {
        CountryMap.unsubscribeAll();
    }

    setActiveTag(alpha3Code: string): void {
        this.activeTag = alpha3Code;
    }

    onTagHover(alpha3Code: string): void {
        CountryMap.notify(alpha3Code);
    }

    onTagLeave(): void {
        CountryMap.notify('');
    }

    private async lazyLoadLeaflet(): Promise<void> {
        if (this.$store.hasModule('leaflet') === false) {
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
        }
    }

    private async lazyLoadGeoJSON(): Promise<void> {
        if (this.$store.hasModule('geojson') === false) {
            const res: Response = await fetch(
                process.env.VUE_APP_GEOJSON_ENDPOINT
            );
            const json: Record<string, unknown> = await res.json();
            this.$store.registerModule('geojson', {
                state: json,
            });
        }
    }

    private async lazyLoadMapTools(): Promise<void> {
        await this.lazyLoadLeaflet();
        await this.lazyLoadGeoJSON();
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
            if (this.country.linearGradients !== '')
                this.textStyles = {
                    background: `linear-gradient(230deg, ${this.country.linearGradients}) center center / cover`,
                    '-webkit-background-clip': 'text',
                    '-moz-background-clip': 'text',
                };
        }
    }

    // async tryFetchCountry(): Promise<void> {
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
