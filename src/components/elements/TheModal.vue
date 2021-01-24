<template>
    <div
        class="fixed top-0 left-0 z-20 w-full h-full overflow-auto bg-black bg-opacity-80"
    >
        <slot name="spinner" />
        <slot name="close" />
        <div class="flex flex-col items-center justify-center h-full">
            <slot name="content" />
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    emits: ['close']
})
export default class TheModal extends Vue {
    private keydownCallback!: (event: KeyboardEvent) => void;

    private body!: HTMLElement;

    created(): void {
        this.keydownCallback = this.onKeyDown.bind(this);
        this.body = document.getElementsByTagName('body')[0];
        window.addEventListener('keydown', this.keydownCallback);
        this.body.style.overflow = 'hidden';
    }

    beforeUnmount(): void {
        window.removeEventListener('keydown', this.keydownCallback);
        this.body.style.overflow = '';
    }

    onKeyDown(event: KeyboardEvent): void {
        if (event.repeat === false) {
            switch (event.key) {
                case 'Escape':
                    this.$emit('close');
                    break;
                default:
                    break;
            }
        }
    }
}
</script>
