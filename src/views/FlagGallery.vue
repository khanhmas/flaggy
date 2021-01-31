<template>
    <div>
        <FlagSearch
            class="fixed left-0 z-10 flex flex-col w-screen px-10 transition duration-1000 ease-out opacity-50 sm:flex-row hover:opacity-100 top-24"
            :count="numberSearchCountries"
            @searchChange="search($event)"
        />
        <section class="text-gray-700 body-font">
            <!-- Don't use animatedCountries variable because it is created inside a setTimeout
            Use countries instead
            -->

            <TheSpinner v-if="countries.length === 0" />
            <div
                v-else
            >
                <div
                    class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 lg:gap-8 xl:gap-12"
                >
                    <transition-group
                        name="scale"
                        mode="in-out"
                        enter-from-class="scale-0 opacity-0"
                        enter-active-class="transition duration-1000 ease-out transform"
                        enter-to-class="scale-100 opacity-1"
                    >
                        <router-link
                            v-for="country in animatedCountries"
                            :key="country.name"
                            :to="{
                                name: 'Detail',
                                params: { alpha3Code: country.alpha3Code },
                            }"
                            class="w-full"
                        >
                            <!-- Method 1 -->
                            <FlagCard
                                :country="country"
                            />
                            <!-- Method 2-->
                            <!-- <keep-alive>
                        <component :is="'FlagCard'"
                        v-for="country in countries"
                        :country="country"></component>
                    </keep-alive>
                    -->
                        </router-link>
                    </transition-group>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import FlagCard from '@/components/FlagCard.vue';
import TheSpinner from '@/components/TheSpinner.vue';
import FlagSearch from '@/components/FlagSearch.vue';
import { Country } from '@/types/country';
import {scrollNearEnd} from '@/utils/utils';
// import { mapGetters } from 'vuex';

@Options({
    components: {
        FlagCard,
        TheSpinner,
        FlagSearch,
    },
    // Method 1: use mapGetters to get countries
    // computed: mapGetters({
    //     countries: 'country/countries'
    // }),
})
export default class FlagGallery extends Vue {
    // countries!: Array<Country>;

    animatedCountries: Array<Country> = [];
    numberSearchCountries: number | null = null;
    private indexLoadedImage: number = 0;
    private readonly OFFSET_LOAD_IMAGE: number = 8;
    private readonly MINIMUM_SEARCHABLE_LETTERS: number = 2;
    private timeout_collection: Array<number> = [];
    searchActive: boolean = false;
    private scrollCallBack!: () => void;

    // Method 2: access getters through $store to get countries
    get countries(): Array<Country> {
        return this.$store.getters['country/countries'];
    }

    async created(): Promise<any> {
        this.scrollCallBack = this.onScrollLoading.bind(this);
        window.addEventListener('scroll', this.scrollCallBack);
        if (this.countries.length == 0)
            await this.$store.dispatch('country/fetchCountries');
        this.numberSearchCountries = this.countries.length;
        this.animateCountriesByOffset();
    }

    beforeUnmount(): void {
        window.removeEventListener('scroll', this.scrollCallBack);
    }

    private onScrollLoading(): void {
        if (
            scrollNearEnd() === true &&
            this.searchActive === false &&
            this.indexLoadedImage < this.countries.length &&
            this.timeout_collection.length === 0
        ) {
            this.animateCountriesByOffset();
        }
    }

    private animateCountriesByOffset(): void {
        const currentIndex: number = this.indexLoadedImage;
        this.indexLoadedImage += this.OFFSET_LOAD_IMAGE;
        this.indexLoadedImage =
            this.indexLoadedImage < this.countries.length
                ? this.indexLoadedImage
                : this.countries.length;
        this.animateCountries(
            this.countries,
            currentIndex,
            this.indexLoadedImage
        );
    }

    private animateCountries(
        countries: Array<Country>,
        currentIndex: number,
        indexLoadedImage: number
    ): void {
        for (
            let i: number = currentIndex, index_timeout: number = 0;
            i < indexLoadedImage;
            i++, index_timeout++
        ) {
            const timeout: number = setTimeout(
                this.addAnimatedImages.bind(this, i, countries),
                200 * index_timeout
            );
            this.timeout_collection.push(timeout);
        }
    }

    private addAnimatedImages(i: number, countries: Array<Country>) {
        if (countries[i] != null) {
            this.animatedCountries.push(countries[i]);
            clearTimeout(this.timeout_collection.shift());
        }
    }

    private clearAllTimeout(): void {
        this.timeout_collection.forEach((timeout: number) => {
            clearTimeout(timeout);
        });
        this.timeout_collection = [];
    }

    private resetAnimatedValue(): void {
        this.animatedCountries = [];
        this.clearAllTimeout();
        this.indexLoadedImage = 0;
    }

    search(event: { filter: keyof Country; searchValue: string }): void {
        const searchValue: string = event.searchValue;
        if (searchValue.length >= this.MINIMUM_SEARCHABLE_LETTERS) {
            this.searchActive = true;
            this.resetAnimatedValue();
            const countries: Array<Country> = this.$store.getters[
                'country/filterCountries'
            ]([event.filter, event.searchValue]);
            this.numberSearchCountries = countries.length;
            this.animateCountries(countries, 0, countries.length);
        } else if (searchValue === '' && this.searchActive === true) {
            this.searchActive = false;
            this.numberSearchCountries = this.countries.length;
            this.resetAnimatedValue();
            this.animateCountriesByOffset();
        }
    }
}
</script>

<style lang="scss" scoped></style>
