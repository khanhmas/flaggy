<template>
    <button
        ref="buttonRef"
        class="relative flex items-center justify-center w-10 transition-all duration-300 focus:outline-none ring-opacity-0 h-9 rounded-3xl flaggy-frost"
        @mouseover="onHover()"
        @mouseleave="onLeave()"
        @click="onClick()"
    >
        <svg
            class="absolute top-3 left-2.5"
            width="20"
            height="15"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
        </svg>
        <transition
            mode="out-in"
            enter-from-class="opacity-0"
            enter-active-class="transition duration-300 ease-in-out delay-300"
            enter-to-class="opacity-100"
            leave-from-class="opacity-100"
            leave-active-class="transition ease-out"
            leave-to-class="opacity-0"
        >
            <slot ref="labelRef" v-if="showLabel"></slot>
        </transition>
    </button>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class BackButton extends Vue {
    showLabel = false;

    onHover(): void {
        this.showLabel = true;
        (this.$refs['buttonRef'] as any).classList.add('w-20');
    }

    onLeave(): void {
        this.showLabel = false;
        (this.$refs['buttonRef'] as any).classList.remove('w-20');
    }

    onClick(): void {
        this.$router.go(-1);
    }
}
</script>
<style lang="scss" scoped></style>
