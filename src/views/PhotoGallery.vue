<template>
    <div :key="alpha3Code" class="mt-12">
        <p class="text-xl text-center">{{name}}</p>
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
        <TheSpinner class="small" />
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TheSpinner from '@/components/TheSpinner.vue';
import PhotoHolder from '@/components/elements/PhotoHolder.vue';
import { PHOTO_CATEGORY } from '@/config/global.config';
import { Photo, SearchResponse } from '@/types/photo';
import {Country} from '@/types/country';

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

    async created(): Promise<any> {
        const country: Country = this.$store.getters['country/countryBy']([
            'alpha3Code',
            this.alpha3Code,
        ]);
        this.name = country.name;
        const query: string = encodeURIComponent(
            [this.name, PHOTO_CATEGORY].join(' ')
        );
        // const queryParams: string = [
        //     'q=' + query,
        //     'page'
        // ].join('&');
        const res: Response = await fetch(
            'https://localhost:3000/unsplash/search?q=' + query
        );
        const searchResponse: SearchResponse = await res.json();
        const photos: Array<Photo> = searchResponse.results;
        // this.photos = [
        //     ...searchResponse.results,
        //     ...searchResponse.results,
        //     ...searchResponse.results,
        //     ...searchResponse.results,
        //     ...searchResponse.results,
        // ];
        this.photos = photos.map((photo: Photo) => {
            const dice: number = Math.floor(Math.random() * 20);
            let width: number = 1080;
            let height: number = 1080;
            let classSize: string = 'row-span-2 col-span-2';
            let ar: string = '1:1';

            if (dice <= 5) {
                width /= 2;
                height /= 2;
                classSize = '';
            } else if (dice > 5 && dice <= 10) {
                height /= 2;
                classSize = 'col-span-2';
                ar = '2:1';
            } else if (dice > 10 && dice <= 15) {
                width /= 2;
                classSize = 'row-span-2';
                ar = '1:2';
            }
            return {
                ...photo,
                urls: {
                    ...photo.urls,
                    raw: [
                        photo.urls.raw,
                        'ar=' + ar,
                        'fm=png',
                        'fit=crop',
                        'auto=format',
                        'w=' + width,
                        'h=' + height,
                        'q=100',
                    ].join('&'),
                },
                classSize,
            };
        });
        console.log(this.photos);
    }
}
</script>
