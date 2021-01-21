<template>
    <div class="relative top-10">
        <!-- <TheSpinner class="small" /> -->
        <div
            class="grid grid-flow-row-dense grid-cols-3 gap-3"
        >
            <!-- <div
                v-for="country of countries"
                :key="country.name"
            >
                <img
                    class="object-cover object-center"
                    :src="country.flag"
                    alt="image"
                    style="width: 300px; height: 75px"
                />
            </div> -->
            <div>
                <img
                    class="object-cover object-center"
                    :src="countries[4].flag"
                    alt=""
                    style="width: 100%; height: 100%"
                />
            </div>
            <div class="col-span-2">
                <img
                    class="object-cover object-center"
                    :src="countries[4].flag"
                    alt=""
                    style="width: 100%; height: 100%"
                />
            </div>
            <div>
                <img
                    class="object-cover object-center"
                    :src="countries[4].flag"
                    alt=""
                    style="width: 100%; height: 100%"
                />
            </div>
            <div class="row-span-2">
                <img
                    class="object-cover object-center"
                    :src="countries[4].flag"
                    alt=""
                    style="width: 100%; height: 100%"
                />
            </div>
            <div>
                <img
                    class="object-cover object-center"
                    :src="countries[4].flag"
                    alt=""
                    style="width: 100%; height: 100%"
                />
            </div>

            <div>
                <img
                    class="object-cover object-center"
                    :src="countries[4].flag"
                    alt=""
                    style="width: 100%; height: 100%"
                />
            </div>
            <div class="col-span-2 row-span-2">
                <img
                    class="object-cover object-center"
                    :src="countries[4].flag"
                    alt=""
                    style="width: 100%; height: 100%"
                />
            </div>
            <div>
                <img
                    class="object-cover object-center"
                    :src="countries[4].flag"
                    alt=""
                    style="width: 100%; height: 100%"
                />
            </div>
            <div class="row-span-2">
                <img
                    class="object-cover object-center"
                    :src="countries[4].flag"
                    alt=""
                    style="width: 100%; height: 100%"
                />
            </div>
            <div>
                <img
                    class="object-cover object-center"
                    :src="countries[4].flag"
                    alt=""
                    style="width: 100%; height: 100%"
                />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TheSpinner from '@/components/TheSpinner.vue';
import { Country } from '@/types/country';

@Options({
    components: {
        TheSpinner,
    },
})
export default class ImageGallery extends Vue {
    get countries(): Array<Country> {
        return this.$store.getters['country/countries'].slice(0, 10);
    }
}
</script>
