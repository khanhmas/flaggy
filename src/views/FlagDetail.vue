<!-- DISCOVERY: The key here is used to replay animation when updating the component on the same route
    add transition and the other related classes to customize animation
    REALLY IMPORTANT: Don't put comment right after the template tag. Otherwise, it will cause a routing problem
    EX: When in detail page, clicking on the header redirecting to / doesn't work anymore
-->
<template>
    <div
        :key="alpha3Code"
        class="pt-32 pb-24 transition duration-700 ease-in px-14"
    >
        <transition
            name="fade"
            mode="out-in"
            enter-from-class="opacity-0"
            enter-active-class="transition duration-700 ease-in-out"
            enter-to-class="opacity-100"
            leave-from-class="opacity-100"
            leave-active-class="transition duration-700 ease-in-out"
            leave-to-class="opacity-0"
        >
            <keep-alive>
                <component :is="'DetailInfo'" :alpha3Code="alpha3Code" />
            </keep-alive>
        </transition>
        <!-- <PhotoGallery :name="name" /> -->
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TheTab from '@/components/navigation/TheTab.vue';
import DetailInfo from '@/views/DetailInfo.vue';

@Options({
    props: {
        alpha3Code: String,
    },
    components: {
        TheTab,
        DetailInfo,
    },
})
export default class FlagDetail extends Vue {
    alpha3Code!: string;

    // borderCountryLabel: string = FLAG_DETAIL_TEXT_FIELDS.borders;
    // name: string = '';
    // flag: string = '';
    // borders: Array<string> = [];
    // labelValuesCol1: Array<{ label: string; value: unknown }> = [];
    // labelValuesCol2: Array<{ label: string; value: unknown }> = [];

    // get mapCodeName(): { [key: string]: string } {
    //     return this.$store.getters['country/mapCodeName'];
    // }

    // get countries(): Array<Country> {
    //     return this.$store.getters['country/countries'];
    // }

    // async created(): Promise<any> {
    //     window.scrollTo(0, 0);
    //     if (this.countries.length === 0)
    //         await this.$store.dispatch('country/fetchCountries');
    //     this.updateCountry();
    // }

    // beforeUpdate(): void {
    //     window.scrollTo(0, 0);
    //     this.updateCountry();
    // }

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

    // private updateCountry(): void {
    //     const country: Country = this.$store.getters['country/countryBy']([
    //         'alpha3Code',
    //         this.alpha3Code,
    //     ]);
    //     this.name = country.name;
    //     this.flag = country.flag;
    //     this.borders = country.borders;
    //     const labelValues: Array<{
    //         label: string;
    //         value: unknown;
    //     }> = initLabelValues(
    //         FLAG_DETAIL_TEXT_FIELDS,
    //         country as Record<keyof Country, unknown>,
    //         convert,
    //         ['borders']
    //     );
    //     this.labelValuesCol1 = labelValues.slice(0, 6);
    //     this.labelValuesCol2 = labelValues.slice(6);
    // }
}
</script>
