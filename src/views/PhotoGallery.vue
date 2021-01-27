<template>
    <div class="mt-12">
        <p class="text-xl text-center">{{ name }}</p>
        <div class="grid grid-flow-row-dense grid-cols-5 gap-3">
            <PhotoHolder
                v-for="photo of photos"
                :key="photo.id"
                :class="photo.classSize"
                :urls="photo.urls"
                :links="photo.links"
                :photographer="photo.user"
                :description="photo.description"
                :alt-description="photo.alt_description"
            />
        </div>
        <TheSpinner
            class="small"
            v-if="photos.length === 0 || fetching === true"
        />
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TheSpinner from '@/components/TheSpinner.vue';
import PhotoHolder from '@/components/elements/PhotoHolder.vue';
import { PHOTO_CATEGORY } from '@/config/global.config';
import { Photo } from '@/types/photo';
import { Country } from '@/types/country';
import { scrollNearEnd } from '@/utils/utils';

@Options({
    components: {
        TheSpinner,
        PhotoHolder,
    },
    props: {
        alpha3Code: String,
    },
})
export default class PhotoGallery extends Vue {
    alpha3Code!: string;
    name: string = '';

    photos: Array<Photo> = [];
    page: number = 1;
    private readonly OFFSET: number = 600;
    fetching: boolean = false;
    private scrollCallBack!: () => void;
    private errorOccured: boolean = false;

    async created(): Promise<any> {
        this.scrollCallBack = this.onScroll.bind(this);
        const country: Country = this.$store.getters['country/countryBy']([
            'alpha3Code',
            this.alpha3Code,
        ]);
        this.name = country.name;
        await this.tryFetchPhotos();
        window.addEventListener('scroll', this.scrollCallBack);
    }

    /**
     * This deactivated and activated hook is used for keep-alive dynamic component
     * When a dynamic component is switched to another one, this hook will be called
     */
    deactivated(): void {
        window.removeEventListener('scroll', this.scrollCallBack);
    }

    /**
     * This deactivated and activated hook is used for keep-alive dynamic component
     * When a dynamic component is switched to this component, this hook will be called
     */
    activated(): void {
        window.addEventListener('scroll', this.scrollCallBack);
    }

    beforeUnmount(): void {
        this.$store.dispatch('photo/resetPage', this.alpha3Code);
    }

    private async onScroll(): Promise<any> {
        if (
            scrollNearEnd(this.OFFSET) === true &&
            window.scrollY > 0 &&
            this.fetching === false &&
            this.errorOccured === false
        ) {
            window.scrollTo(0, window.scrollY - this.OFFSET);
            await this.tryFetchPhotos();
        }
    }

    private async tryFetchPhotos(): Promise<any> {
        const shouldFetch: boolean = this.$store.getters['photo/shouldFetch'](
            this.alpha3Code
        );
        if (shouldFetch === false) {
            /**
             * Retrieve photos from store
             */
            this.$store.dispatch('photo/nextPage', this.alpha3Code);
            const photos: Array<Photo> = this.$store.getters[
                'photo/getCurrentPhotosPage'
            ](this.alpha3Code);
            this.photos.push(...photos);
        } else {
            /**
             * Fetch photos from unsplash
             */
            this.fetching = true;
            await this.fetchPhotos();
            this.fetching = false;
        }
    }

    private async fetchPhotos(): Promise<any> {
        const searchQuery: string = encodeURIComponent(
            [this.name, PHOTO_CATEGORY].join(' ')
        );
        await this.$store.dispatch('photo/fetchPhotos', {
            searchQuery,
            alpha3Code: this.alpha3Code,
        });
        const photos: Array<Photo> = this.$store.getters[
            'photo/getCurrentPhotosPage'
        ](this.alpha3Code);
        if (photos != null && photos.length > 0) this.photos.push(...photos);
        else this.errorOccured = true;
    }
}
</script>
