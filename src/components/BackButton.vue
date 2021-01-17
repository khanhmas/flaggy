<template>
    <button
        ref="buttonRef"
        class="flaggy-back-button"
        @mouseleave="onLeave()"
        @click="onClick()"
    >
        <slot name="svg"> </slot>
        <!-- <transition
            mode="out-in"
            enter-from-class="opacity-0"
            enter-active-class="transition duration-300 ease-in-out delay-300"
            enter-to-class="opacity-100"
            leave-from-class="opacity-100"
            leave-active-class="transition ease-out"
            leave-to-class="opacity-0"
        >
            <slot ref="labelRef" v-if="showLabel"></slot>
        </transition> -->
        <span class="ml-5 transition duration-300">
            <slot></slot>
        </span>
    </button>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class BackButton extends Vue {
    // showLabel = false;

    // onHover(): void {
    //     this.showLabel = true;
    //     (this.$refs['buttonRef'] as any).classList.add('w-20');
    // }

    onLeave(): void {
        // this.showLabel = false;
        // (this.$refs['buttonRef'] as any).classList.remove('w-20');
        const buttonEl: HTMLElement = this.$refs['buttonRef'] as HTMLElement;
        if (buttonEl != null)
            buttonEl.blur();
    }

    onClick(): void {
        this.$router.go(-1);
    }
}
</script>
<style lang="scss" scoped></style>
