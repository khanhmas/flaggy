<template>
    <button class="rounded-full flaggy-frost" @click="onButtonClick($event)">
        <a :href="link">
            <slot />
        </a>
    </button>
</template>
<script lang="ts">
import { PhotoService } from '@/services/photo.service';
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        link: String,
        buttonClickParams: String
    }
})
export default class PhotoButton extends Vue {
    link!: string;
    buttonClickParams!: string;

    /**
     * stopPropagation the zoomIn event
     */
    onButtonClick(event: Event): void {
        event.stopPropagation();
        PhotoService.trackDownload(this.buttonClickParams);
    }
}
</script>
