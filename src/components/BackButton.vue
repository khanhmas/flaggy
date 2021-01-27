<template>
    <button
        ref="buttonRef"
        class="flaggy-back-button"
        @mouseleave="onLeave()"
        @click="onClick()"
    >
        <slot name="svg" />
        <span class="ml-5 transition duration-300 dark:text-white">
            <slot />
        </span>
    </button>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class BackButton extends Vue {

    private keydownCallback!: (event: KeyboardEvent) => void;

    created(): void {
        this.keydownCallback = this.onKeyDown.bind(this);
        window.addEventListener('keydown', this.keydownCallback);
    }

    beforeUnmount(): void {
        window.removeEventListener('keydown', this.keydownCallback);
    }

    onKeyDown(event: KeyboardEvent): void {
        if (event.repeat === false) {
            switch (event.key) {
                case 'Backspace':
                    this.onClick();
                    break;
                default:
                    break;
            }
        }
    }

    onLeave(): void {
        const buttonEl: HTMLElement = this.$refs['buttonRef'] as HTMLElement;
        buttonEl?.blur();
    }

    onClick(): void {
        const body: HTMLElement = document.getElementsByTagName('body')[0];
        if (body.classList.contains('modal-mode') === false)
            this.$router.back();
    }
}
</script>
<style lang="scss" scoped></style>
