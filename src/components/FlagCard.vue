<!--
    DISCOVERY: The transition element (from Vue 3) will remove the equivalent classes in the rootElement inside it. For example: if we add "transition" class into enter-active-class attribute in transition element, it will also be removed from the class in the div below
-->
<template>
    <div
        :id="name"
        class="inline-block w-full min-h-full transition transform rounded-xl hover:scale-110"
        @mouseover="onHover()"
        @mouseleave="onLeave()"
    >
        <img
            ref="flag_image"
            loading="lazy"
            class="object-cover object-center w-full max-h-screen sm:h-48 rounded-t-md"
            :src="flag"
            alt="country card"
        >
        <div class="p-6 flaggy-frost rounded-b-xl">
            <h2
                class="mb-4 text-lg font-extrabold leading-none text-left truncate"
                :title="name"
            >
                {{ name }}
            </h2>
            <FlagLabelInfo :truncate="true" :label-values="labelValues" />
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import FlagLabelInfo from '@/components/FlagLabelInfo.vue';
import { FLAG_CARD_TEXT_FIELDS } from '@/config/global.config';
import { FlagCardLabel } from '@/interfaces/flagCardLabel';
import { initLabelValues } from '@/utils/utils';

@Options({
    components: {
        FlagLabelInfo,
    },
    props: {
        name: String,
        flag: String,
        population: Number,
        region: String,
        capital: String,
        altSpellings: Array
    },
})
export default class FlagCard extends Vue implements FlagCardLabel {
    name!: string;
    flag!: string;
    population!: number;
    region!: string;
    capital!: string;
    altSpellings!: Array<string>;

    labelValues: Array<{ label: string; value: unknown }> = [];
    // showable: boolean = false;

    created(): void {
        // setTimeout(() => {
        //     this.showable = true;
        // }, 1000);
        this.labelValues = initLabelValues(
            FLAG_CARD_TEXT_FIELDS,
            this as Record<string, unknown>
        );
    }

    onHover(): void {
        (this.$refs['flag_image'] as any)?.classList.add('animate-pulse');
        // (this.$refs['container'] as any)?.classList.add('transition', 'transform');
    }

    onLeave(): void {
        (this.$refs['flag_image'] as any)?.classList.remove('animate-pulse');
    }
}
</script>
<style lang="scss" scoped></style>
