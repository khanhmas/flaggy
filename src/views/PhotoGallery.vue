<template>
    <div>
        <div
            class="grid grid-flow-row-dense grid-cols-1 gap-3 md:grid-cols-4 lg:grid-cols-5"
        >
            <PhotoHolder
                v-for="photo of photos"
                :key="photo.id"
                :class="calculatePhotoClassSize(photo)"
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
import { Photo } from '@/types/photo';
import { Country } from '@/types/country';
import { getScreen, scrollNearEnd } from '@/utils/utils';
import photo from '@/store/modules/photo';

@Options({
    components: {
        TheSpinner,
        PhotoHolder,
    },
    props: {
        country: Object,
        additionalData: Object,
    },
})
export default class PhotoGallery extends Vue {
    country!: Country;
    additionalData!: Record<string, unknown>;

    photos: Array<Photo> = [];
    page: number = 1;
    fetching: boolean = false;
    searchCategory: string = '';

    private readonly OFFSET: number = 700;
    private scrollCallBack!: () => void;
    private errorOccured: boolean = false;

    beforeCreate(): void {
        if (this.$store.hasModule('photo') === false) {
            this.$store.registerModule('photo', photo);
        }
    }

    async created(): Promise<void> {
        this.searchCategory = this.additionalData.photoCategory as string;
        this.scrollCallBack = this.onScroll.bind(this);
        await this.tryFetchPhotos();
        window.addEventListener('scroll', this.scrollCallBack);
    }

    async beforeUpdate(): Promise<void> {
        if (
            this.searchCategory !==
            (this.additionalData.photoCategory as string)
        ) {
            this.resetComponent();
            this.updateNewCategoryPhotos();
        }
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
        console.log('beforeUnmount');
        this.$store.dispatch('photo/resetPage', {
            alpha3Code: this.country.alpha3Code,
            category: this.searchCategory,
        });
        this.$store.unregisterModule('photo');
    }

    calculatePhotoClassSize(photo: Photo): string {
        return getScreen() !== 'sm' ? photo.classSize : '';
    }

    private async updateNewCategoryPhotos(): Promise<void> {
        this.searchCategory = this.additionalData.photoCategory as string;
        await this.tryFetchPhotos();
    }

    private resetComponent(): void {
        window.scrollTo(0, 0);
        this.$store.dispatch('photo/resetPage', {
            alpha3Code: this.country.alpha3Code,
            category: this.searchCategory,
        });
        this.photos = [];
    }

    private async onScroll(): Promise<void> {
        if (
            scrollNearEnd(this.OFFSET) === true &&
            window.scrollY > 0 &&
            this.fetching === false &&
            this.errorOccured === false
        ) {
            await this.tryFetchPhotos();
        }
    }

    private async tryFetchPhotos(): Promise<void> {
        const shouldFetch: boolean = this.$store.getters['photo/shouldFetch']({
            alpha3Code: this.country.alpha3Code,
            category: this.searchCategory,
        });
        if (shouldFetch === false) {
            /**
             * Retrieve photos from store
             */
            this.$store.dispatch('photo/nextPage', {
                alpha3Code: this.country.alpha3Code,
                category: this.searchCategory,
            });
            const photos: Array<Photo> = this.$store.getters[
                'photo/getCurrentPhotosPage'
            ]({
                alpha3Code: this.country.alpha3Code,
                category: this.searchCategory,
            });
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

    private async fetchPhotos(): Promise<void> {
        const languages: Array<{ name: string; nativeName: string }> = this
            .country.languages;
        const countrySearchValue: string =
            languages[languages.length - 1].name || this.country.name;
        const searchQuery: string = encodeURIComponent(
            [countrySearchValue, this.searchCategory].join(' ')
        );
        await this.$store.dispatch('photo/fetchPhotos', {
            searchQuery,
            alpha3Code: this.country.alpha3Code,
            category: this.searchCategory,
        });
        const photos: Array<Photo> = this.$store.getters[
            'photo/getCurrentPhotosPage'
        ]({
            alpha3Code: this.country.alpha3Code,
            category: this.searchCategory,
        });
        if (photos != null && photos.length > 0) this.photos.push(...photos);
        else this.errorOccured = true;
    }
}
</script>
