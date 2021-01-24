<template>
    <div class="relative photo-holder-container cursor-zoom-in">
        <figure class="w-full h-full" @click="openModal()">
            <img
                loading="lazy"
                :src="urls.raw"
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
                            v-alterHref:[ADDITIONAL_QUERY_PARAMS]="
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
                            @click="$event.stopPropagation()"
                            class="p-1 ml-auto pointer-events-auto"
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
                    <img
                        @load="showSpinner = false"
                        :src="urls.full"
                        :alt="description"
                        :class="[zoomIn === false ? 'max-h-screen' : '']"
                    />
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
import { ADDITIONAL_QUERY_PARAMS } from '@/config/global.config';

@Options({
    props: {
        urls: Object,
        altDescription: String,
        description: String,
        photographer: Object,
        links: Object,
    },
    components: {
        PhotoButton,
        TheModal,
        TheSpinner,
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

    showModal: boolean = false;
    showSpinner: boolean = false;

    zoomIn: boolean = false;

    readonly ADDITIONAL_QUERY_PARAMS: Record<
        string,
        string
    > = ADDITIONAL_QUERY_PARAMS;

    openModal(): void {
        this.showModal = this.showSpinner = true;
        this.zoomIn = false;
    }

    closeModal(): void {
        this.zoomIn = this.showModal = false;
    }
}
</script>

<style lang="scss" scoped>
div.photo-holder-container:not(:hover) {
    .photo-cover,
    .photo-info,
    .photo-description {
        visibility: hidden;
        opacity: 0;
    }
}
</style>
