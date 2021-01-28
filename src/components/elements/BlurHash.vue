<template>
    <canvas
        ref="canvas"
        :width="width"
        :height="height"
        class="w-full h-full"
    ></canvas>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { decode, isBlurhashValid } from 'blurhash';

@Options({
    props: {
        hash: String,
        width: Number,
        height: Number,
    },
})
export default class BlurHash extends Vue {
    hash!: string;
    width!: number;
    height!: number;

    private pixels: Uint8ClampedArray = null as any; // to bypass typing error

    created(): void {
        const validRes: {
            result: boolean;
            errorReason?: string;
        } = isBlurhashValid(this.hash);

        if (validRes.result === true) {
            this.pixels = decode(this.hash, this.width, this.height);
        }
    }

    mounted(): void {
        if (this.pixels != null) {
            const canvas: HTMLCanvasElement = this.$refs[
                'canvas'
            ] as HTMLCanvasElement;
            const ctx: CanvasRenderingContext2D | null = canvas.getContext(
                '2d'
            );
            const imageData: ImageData | undefined = ctx?.createImageData(
                this.width,
                this.height
            );
            if (imageData != null) {
                imageData.data?.set(this.pixels);
                ctx?.putImageData(imageData, 0, 0);
            }
        }
    }
}
</script>
