<!-- DISCOVERY: The key here is used to replay animation when updating the component on the same route
    add transition and the other related classes to customize animation
    REALLY IMPORTANT: Don't put comment right after the template tag. Otherwise, it will cause a routing problem
    EX: When in detail page, clicking on the header redirecting to / doesn't work anymore
-->
<template>
    <div :key="alpha3Code">
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
                <component
                    :is="additionalData['componentName']"
                    :additional-data="additionalData"
                    :country="country"
                />
            </keep-alive>
        </transition>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import DetailInfo from '@/views/DetailInfo.vue';
import PhotoGallery from '@/views/PhotoGallery.vue';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { Country } from '@/types/country';
import { TabMetadata } from '@/config/global.config';

Vue.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate',
]);

@Options({
    props: {
        alpha3Code: String,
        additionalData: Object,
    },
    components: {
        DetailInfo,
        PhotoGallery,
    },
})
export default class FlagDetail extends Vue {
    alpha3Code!: string;
    additionalData!: Record<string, unknown>;
    defaultTab: TabMetadata = {} as any; // bypass typing error
    country: Country = {} as any; // bypass typing error

    get countries(): Array<Country> {
        return this.$store.getters['country/countries'];
    }

    async created(): Promise<any> {
        window.scrollTo(0, 0);
        this.defaultTab = {
            label: this.additionalData.label as string,
            componentName: this.additionalData.componentName as string,
            photoCategory: this.additionalData.photoCategory as string,
        };
        if (this.countries.length === 0)
            await this.$store.dispatch('country/fetchCountries');
        this.changeCountry();
    }

    beforeUpdate(): void {
        this.changeCountry();
    }

    changeCountry(): void {
        const country: Country = this.getCurrentCountry();
        // Incorrect alpha3Code
        if (country != null) {
            this.country = country;
            this.$store.commit('country/setCurrentCountryName', country.name);
        } else this.$router.push('/');
    }

    getCurrentCountry(): Country {
        const country: Country = this.$store.getters['country/countryBy']([
            'alpha3Code',
            this.alpha3Code,
        ]);
        return country;
    }

    /**
     * When the FlagDetail component (inside keep-alive) is deactivated
     * (means that users navigate away the Detail route)
     * reset this to the defaultComponent (DetailInfo in this case, cf default tab in global.config)
     * in order to prevent the jumping from landscape to information tab when users come back into the Detail route
     */
    deactivated(): void {
        /**
         * Set label to toggle the tab
         * Set componentName to re-render the component
         */
        this.additionalData.label = this.defaultTab.label;
        this.additionalData.componentName = this.defaultTab.componentName;
        this.$store.commit('country/resetCurrentCountryName');
    }

    beforeRouteUpdate(
        to: RouteLocationNormalized,
        from: RouteLocationNormalized,
        next: NavigationGuardNext
    ): void {
        this.rewriteRouting(to, from, next);
    }

    beforeRouteLeave(
        to: RouteLocationNormalized,
        from: RouteLocationNormalized,
        next: NavigationGuardNext
    ): void {
        this.rewriteRouting(to, from, next);
    }

    private rewriteRouting(
        to: RouteLocationNormalized,
        from: RouteLocationNormalized,
        next: NavigationGuardNext
    ) {
        if (this.additionalData.label !== this.defaultTab.label) {
            this.additionalData.label = this.defaultTab.label;
            this.additionalData.componentName = this.defaultTab.componentName;
            next(false);
        } else next();
    }
}
</script>
