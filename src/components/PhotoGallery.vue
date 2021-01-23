<template>
    <div class="relative top-10">
        <div class="grid grid-flow-row-dense grid-cols-3 gap-5">
            <div v-for="photo of photos" :key="photo.id">
                <img
                    loading="lazy"
                    :src="photo.urls.regular"
                    :alt="photo.description"
                    class="object-cover object-center w-full h-full">
            </div>
            <!-- <div>
                <img
                    :src="photos[0]?.urls.raw"
                    :alt="photos[0]?.description"
                    class="object-cover object-center w-full h-full">
            </div>
            <div class="col-span-2">
                <img
                    :src="photos[0]?.urls.raw"
                    :alt="photos[0]?.description"
                    class="object-cover object-center w-full h-full">
            </div>
            <div>
                <img
                    :src="photos[0]?.urls.raw"
                    :alt="photos[0]?.description"
                    class="object-cover object-center w-full h-full">
            </div>
            <div class="row-span-2">
                <img
                    :src="photos[0]?.urls.raw"
                    :alt="photos[0]?.description"
                    class="object-cover object-center w-full h-full">
            </div>
            <div>
                <img
                    :src="photos[0]?.urls.raw"
                    :alt="photos[0]?.description"
                    class="object-cover object-center w-full h-full">
            </div>
            <div class="col-span-2 row-span-2">
                <img
                    :src="photos[0]?.urls.raw"
                    :alt="photos[0]?.description"
                    class="object-cover object-center w-full h-full">
            </div>
            <div>
                <img
                    :src="photos[0]?.urls.raw"
                    :alt="photos[0]?.description"
                    class="object-cover object-center w-full h-full">
            </div> -->
        </div>
        <TheSpinner class="small" />
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TheSpinner from '@/components/TheSpinner.vue';
import { PHOTO_CATEGORY } from '@/config/global.config';
import { Photo, SearchResponse } from '@/types/photo';

@Options({
    components: {
        TheSpinner,
    },
    props: {
        name: String,
    },
})
export default class PhotoGallery extends Vue {
    name!: string;

    photos: Array<Photo> = [];

    async created(): Promise<any> {
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
        this.photos = searchResponse.results;
        // this.photos = [
        //     ...searchResponse.results,
        //     ...searchResponse.results,
        //     ...searchResponse.results,
        //     ...searchResponse.results,
        //     ...searchResponse.results,
        // ];
        // this.photos = this.photos.map((photo: Photo) => {
        //     return {
        //         ...photo,
        //         urls: {
        //             ...photo.urls,
        //             raw: [photo.urls.raw, 'fm=png', 'fit=max', 'w=1080'].join('&')
        //         }
        //     }
        // });
        console.log(this.photos);
    }
}
</script>
