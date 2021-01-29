<template>
    <div>
        <div class="grid grid-flow-row-dense grid-cols-5 gap-3">
            <PhotoHolder
                v-for="photo of photos"
                :key="photo.id"
                :class="photo.classSize"
                :urls="photo.urls"
                :links="photo.links"
                :photographer="photo.user"
                :description="photo.description"
                :blur-hash="photo.blur_hash"
                :canvas-width="photo.canvasWidth"
                :canvas-height="photo.canvasHeight"
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
import photo from '@/store/modules/photo';

@Options({
    components: {
        TheSpinner,
        PhotoHolder,
    },
    props: {
        country: Object
    },
})
export default class PhotoGallery extends Vue {
    country!: Country;

    photos: Array<Photo> = [];
    page: number = 1;
    fetching: boolean = false;

    private readonly OFFSET: number = 600;
    private scrollCallBack!: () => void;
    private errorOccured: boolean = false;

    beforeCreate(): void {
        if (this.$store.hasModule('photo') === false) {
            this.$store.registerModule('photo', photo);
        }
    }

    async created(): Promise<any> {
        this.scrollCallBack = this.onScroll.bind(this);
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
        this.$store.dispatch('photo/resetPage', this.country.alpha3Code);
        this.$store.unregisterModule('photo');
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
            this.country.alpha3Code
        );
        if (shouldFetch === false) {
            /**
             * Retrieve photos from store
             */
            this.$store.dispatch('photo/nextPage', this.country.alpha3Code);
            const photos: Array<Photo> = this.$store.getters[
                'photo/getCurrentPhotosPage'
            ](this.country.alpha3Code);
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
            [this.country.name, PHOTO_CATEGORY].join(' ')
        );
        await this.$store.dispatch('photo/fetchPhotos', {
            searchQuery,
            alpha3Code: this.country.alpha3Code,
        });
        const photos: Array<Photo> = this.$store.getters[
            'photo/getCurrentPhotosPage'
        ](this.country.alpha3Code);
        if (photos != null && photos.length > 0) this.photos.push(...photos);
        else this.errorOccured = true;
    }
}
</script>
