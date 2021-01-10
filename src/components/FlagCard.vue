<template>
    <div
        @mouseover="onHover()"
        @mouseleave="onLeave()"
        class="inline-block w-full transition-all transform border shadow hover:shadow-2xl rounded-xl flag-container hover:scale-110"
        :id="name"
    >
        <img
            crossorigin="anonymous"
            ref="flag_image"
            class="md:max-h-screen flag-image rounded-t-md"
            :src="imgSrc"
            alt="country card"
        />
        <div class="p-6">
            <h2
                class="mb-4 text-lg font-extrabold leading-none text-left truncate"
                :title="name"
            >
                {{ name }}
            </h2>
            <FlagLabelInfo :labelValues="labelValues" />
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import FlagLabelInfo from '@/components/FlagLabelInfo.vue';
import { FLAG_CARD_TEXT_FIELDS } from '@/config/global.config';
import { FlagCardLabel } from '@/interfaces/flag_card_label';
import { FlagDetailLabel } from '@/interfaces/flag_detail_label';
import { initLabelValues } from '@/utils/utils';

@Options({
    components: {
        FlagLabelInfo,
    },
    props: {
        name: String,
        flag: String,
        population: String,
        region: String,
        capital: String,
        // base64: String
    },
})
export default class FlagCard extends Vue implements FlagCardLabel {
    name!: string;
    flag!: string;
    population!: string;
    region!: string;
    capital!: string;
    // base64!: string;

    imgSrc!: string;

    labelValues: Array<{ label: string; value: unknown }> = [];

    created(): void {
        this.imgSrc = this.flag;
        this.labelValues = initLabelValues(
            FLAG_CARD_TEXT_FIELDS,
            this as Record<string, unknown>
        );
    }

    // get imageSrc(): string {
    //     return this.base64 !== '' ? this.base64 : this.flag;
    // }

    // beforeUpdate(): void {
    //     console.log('beforeUpdate ', this.flag);
    // }

    // updated(): void {
    //     console.log('updated ', this.flag);
    // }

    mounted(): void {
        // (this.$refs['flag_image'] as any).addEventListener(
        //     'load',
        //     this.convertFlagSrcBase64.bind(this)
        // );
    }

    private convertFlagSrcBase64(event: Event): void {
        this.$store.dispatch('country/convertFlagSrcBase64', {
            name: this.name,
            base64: this.getBase64Image(event.target as HTMLImageElement),
        });
        (this.$refs['flag_image'] as any).removeEventListener('load', this.convertFlagSrcBase64.bind(this));
    }

    private getBase64Image(img: HTMLImageElement): string {
        const canvas: HTMLCanvasElement = document.createElement(
            'CANVAS'
        ) as HTMLCanvasElement;
        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
        canvas.height = img.naturalHeight;
        canvas.width = img.naturalWidth;
        ctx!.drawImage(img, 0, 0);
        return canvas.toDataURL('image/svg+xml');
    }

    onHover(): void {
        (this.$refs['flag_image'] as any).classList.add('animate-pulse');
    }

    onLeave(): void {
        (this.$refs['flag_image'] as any).classList.remove('animate-pulse');
    }
}
</script>
<style lang="scss" scoped>
.flag-container {
    max-height: auto;
}
.flag-image {
    height: auto;
    width: auto;
}
@media (min-width: 1024px) {
    .flag-container {
        max-height: 360px;
    }
    .flag-image {
        width: 300px;
        height: 193px;
        contain-intrinsic-size: 193px;
        content-visibility: auto;
    }
}
</style>
