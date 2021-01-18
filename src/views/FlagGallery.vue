<template>
    <section class="text-gray-700 body-font">
        <!-- Don't use animated_countries variable because it is created inside a setTimeout
        Use countries instead
        -->
        <TheSpinner v-if="countries.length === 0" />
        <div v-else class="container p-24 px-8 mx-auto lg:px-10">
            <transition
                name="fade"
                enter-from-class="opacity-0"
                enter-active-class="transition duration-1000 ease-in-out"
                enter-to-class="opacity-100"
                leave-from-class="opacity-100"
                leave-active-class="transition duration-500 ease-out"
                leave-to-class="opacity-0"
            >
                <FlagSearch v-if="animated_countries.length > 0" />
            </transition>
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
                            params: { alpha3Code: country.alpha3Code },
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
import TheSpinner from '@/components/TheSpinner.vue';
import FlagSearch from '@/components/FlagSearch.vue';
import { Country } from '@/types/country';
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

    animated_countries: Array<Country> = [];
    private numberLoadedImage: number = 0;
    private readonly OFFSET_LOAD_IMAGE: number = 8;
    private timeout_collection: Array<number> = [];

    // Method 2: access getters through $store to get countries
    get countries(): Array<Country> {
        return this.$store.getters['country/countries'];
    }

    async created(): Promise<any> {
        window.addEventListener('scroll', this.onScrollLoading.bind(this));
        if (this.countries.length == 0)
            await this.$store.dispatch('country/fetchCountries');
        this.animateCountries();
    }

    beforeDestroy(): void {
        window.removeEventListener('scroll', this.onScrollLoading.bind(this));
    }

    private onScrollLoading(): void {
        if (
            window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 1 &&
            this.numberLoadedImage < this.countries.length &&
            this.timeout_collection.length === 0
        ) {
            this.animateCountries();
        }
    }

    private animateCountries(): void {
        // this.countries.forEach((country: Country, index: number) => {
        //     const timeout: number = setTimeout(() => {
        //         this.animated_countries.push(country);
        //         clearTimeout(timeout);
        //     }, 200 * index);
        // });
        const currentIndex: number = this.numberLoadedImage;
        this.numberLoadedImage += this.OFFSET_LOAD_IMAGE;
        this.numberLoadedImage =
            this.numberLoadedImage < this.countries.length
                ? this.numberLoadedImage
                : this.countries.length;
        for (
            let i: number = currentIndex, index_timeout: number = 0;
            i < this.numberLoadedImage;
            i++, index_timeout++
        ) {
            const timeout: number = setTimeout(
                this.addAnimatedImages.bind(this, i, index_timeout),
                200 * index_timeout
            );
            this.timeout_collection.push(timeout);
        }
    }

    private addAnimatedImages(i: number) {
        if (this.countries[i] != null) {
            this.animated_countries.push(this.countries[i]);
            clearTimeout(this.timeout_collection.shift());
        }
    }
}
</script>

<style lang="scss" scoped></style>
