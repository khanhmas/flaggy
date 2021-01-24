<template>
    <div class="relative photo-holder-container cursor-zoom-in">
        <figure class="w-full h-full">
            <!-- <div class="relative z-10">
                <img
                    loading="lazy"
                    :src="src"
                    :alt="description"
                    class="object-cover object-center w-full h-full"
                />
            </div> -->
            <img
                loading="lazy"
                :src="src"
                :alt="description"
                class="object-cover object-center w-full h-full"
            />
            <div class="pointer-events-none">
                <div class="absolute top-0 bottom-0 left-0 right-0 transition duration-300 photo-cover"></div>
                <div
                    class="absolute bottom-0 left-0 flex flex-col-reverse p-5 text-white"
                >
                    <div class="flex items-center transition duration-300 photo-info">
                        <img
                            class="rounded-full"
                            :src="photographer.profile_image.small"
                            :alt="photographer.name"
                        />
                        <span class="ml-3">{{ photographer.name }}</span>
                        <!-- <PhotoButton
                                class="ml-auto"
                                :link="downloadLocation"
                            >
                                <template #default>
                                    <svg
                                        width="32"
                                        height="32"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                        />
                                    </svg>
                                </template>
                            </PhotoButton> -->
                    </div>
                </div>
            </div>
        </figure>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { PhotoGrapher } from '@/types/photo';
import PhotoButton from '@/components/elements/PhotoButton.vue';

@Options({
    props: {
        src: String,
        description: String,
        photographer: Object,
    },
    components: {
        PhotoButton,
    },
})
export default class PhotoHolder extends Vue {
    src!: string;
    description!: string;
    photographer!: PhotoGrapher;
}
</script>

<style lang="scss" scoped>
div.photo-holder-container:not(:hover) {
    .photo-cover, .photo-info {
        visibility: hidden;
        opacity: 0;
    }
}
</style>
