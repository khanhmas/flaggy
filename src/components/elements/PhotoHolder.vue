<template>
    <div class="relative">
        <img
            ref="imageHolder"
            loading="lazy"
            @load="onPhotoLoaded()"
            :src="getUrlByScreen()"
            :alt="description"
            class="fixed top-0 bottom-0 left-0 right-0 invisible"
        />
        <!--
            Add position: absolute into leave-active-class to have a smooth fade-out animation
            and to prevent the jumping-image flickering
        -->
        <transition
            name="fade-out-only"
            leave-from-class="opacity-100"
            leave-active-class="absolute transition duration-700 ease-out"
            leave-to-class="opacity-0"
        >
            <BlurHash
                :width="canvasWidth"
                :height="canvasHeight"
                v-if="photoLoaded === false"
                :hash="blurHash"
            />
        </transition>
        <transition
            name="fade"
            enter-from-class="opacity-0"
            enter-active-class="transition duration-700 ease-in"
            enter-to-class="opacity-100"
        >
            <figure
                v-if="photoLoaded === true"
                class="w-full h-full photo-holder-container cursor-zoom-in"
                @click="openModal()"
            >
                <img
                    loading="lazy"
                    :src="getUrlByScreen()"
                    :alt="description"
                    class="object-cover object-center w-full h-full"
                />
                <div class="pointer-events-none">
                    <div
                        class="absolute top-0 bottom-0 left-0 right-0 transition duration-500 photo-cover"
                    ></div>
                    <div
                        v-if="altDescription != null && altDescription !== ''"
                        class="absolute top-0 left-0 flex p-3 text-white transition duration-500 photo-description"
                    >
                        {{ altDescription }}
                    </div>
                    <div
                        class="absolute bottom-0 left-0 flex flex-col-reverse w-full p-5 text-white"
                    >
                        <div class="flex transition duration-500 photo-info">
                            <a
                                @click="$event.stopPropagation()"
                                v-alterHref:[ATTRIBUTION_QUERY_PARAMS]="
                                    photographer.links.html
                                "
                                target="_blank"
                                class="flex items-center transition duration-500 pointer-events-auto"
                            >
                                <img
                                    class="rounded-full"
                                    :src="photographer.profile_image.small"
                                    :alt="photographer.name"
                                />
                                <p
                                    class="ml-3 truncate w-28"
                                    :title="photographer.name"
                                >
                                    {{ photographer.name }}
                                </p>
                            </a>
                            <PhotoButton
                                class="p-1 ml-auto pointer-events-auto"
                                :button-click-params="links.download_location"
                                :link="links.download + '?force=true'"
                            >
                                <template #default>
                                    <svg
                                        width="24"
                                        height="24"
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
                            </PhotoButton>
                        </div>
                    </div>
                </div>
            </figure>
        </transition>
        <transition
            name="fade"
            mode="out-in"
            enter-from-class="scale-0"
            enter-active-class="transition duration-700 ease-in-out transform"
            enter-to-class="scale-100"
        >
            <TheModal
                @close="closeModal()"
                v-if="showModal === true"
                @click="zoomIn = !zoomIn"
                :class="[
                    zoomIn === false ? 'cursor-zoom-in' : 'cursor-zoom-out',
                ]"
            >
                <template #spinner>
                    <TheSpinner v-if="showSpinner === true" />
                </template>
                <template #close>
                    <span
                        @click="closeModal()"
                        class="fixed top-3.5 right-9 text-4xl font-bold text-white cursor-pointer"
                    >&times;</span
                    >
                </template>
                <template #content>
                    <div :class="[zoomIn === false ? 'absolute top-0 image-container' : 'absolute top-0 image-container']">
                        <img
                            @load="showSpinner = false"
                            :src="urls.regular"
                            :alt="description"
                            :class="[zoomIn === false ? 'h-full' : '']"
                        />
                        <div class="pt-2 text-xl text-center text-white">
                            <span>Photo by </span>
                            <a
                                @click="$event.stopPropagation()"
                                class="hover:underline"
                                v-alterHref:[ATTRIBUTION_QUERY_PARAMS]="
                                    photographer.links.html
                                "
                                target="_blank"
                            >{{ photographer.name }}</a
                            >
                            <span> on </span>
                            <a
                                @click="$event.stopPropagation()"
                                class="hover:underline"
                                v-alterHref:[ATTRIBUTION_QUERY_PARAMS]="
                                    PHOTO_PROVIDER.domain
                                "
                                target="_blank"
                            >{{ PHOTO_PROVIDER.name }}</a
                            >
                        </div>
                    </div>
                </template>
            </TheModal>
        </transition>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { PhotoGrapher } from '@/types/photo';
import alterHref from '@/directives/alterHref';
import PhotoButton from '@/components/elements/PhotoButton.vue';
import TheModal from '@/components/elements/TheModal.vue';
import TheSpinner from '@/components/TheSpinner.vue';
import BlurHash from '@/components/elements/BlurHash.vue';
import {
    ATTRIBUTION_QUERY_PARAMS,
    PHOTO_PROVIDER,
} from '@/config/global.config';
import { getScreen } from '@/utils/utils';

@Options({
    props: {
        urls: Object,
        altDescription: String,
        description: String,
        photographer: Object,
        links: Object,
        blurHash: String,
        canvasWidth: Number,
        canvasHeight: Number,
    },
    components: {
        PhotoButton,
        TheModal,
        TheSpinner,
        BlurHash,
    },
    directives: {
        alterHref,
    },
})
export default class PhotoHolder extends Vue {
    urls!: Record<string, string>;
    description!: string;
    altDescription!: string;
    photographer!: PhotoGrapher;
    links!: Record<string, string>;
    blurHash!: string;
    canvasWidth!: number;
    canvasHeight!: number;

    showModal: boolean = false;
    showSpinner: boolean = false;

    zoomIn: boolean = false;
    photoLoaded: boolean = false;
    screen: string = 'lg';

    readonly ATTRIBUTION_QUERY_PARAMS: Record<
        string,
        string
    > = ATTRIBUTION_QUERY_PARAMS;
    readonly PHOTO_PROVIDER: Record<string, string> = PHOTO_PROVIDER;

    created(): void {
        this.screen = getScreen();
    }

    openModal(): void {
        if (this.screen !== 'sm') {
            this.showModal = this.showSpinner = true;
            this.zoomIn = false;
        }
    }

    getUrlByScreen(): string {
        return this.screen !== 'sm' ? this.urls.raw : this.urls.small;
    }

    closeModal(): void {
        this.showModal = false;
    }

    onPhotoLoaded(): void {
        this.photoLoaded = true;
        (this.$refs['imageHolder'] as HTMLElement)?.remove();
    }
}
</script>

<style lang="scss" scoped>
.photo-holder-container:not(:hover) {
    .photo-cover,
    .photo-info,
    .photo-description {
        visibility: hidden;
        opacity: 0;
    }
}

.image-container {
    height: calc(100vh - 50px);
}
</style>
