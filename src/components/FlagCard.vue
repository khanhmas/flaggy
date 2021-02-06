<!--
    DISCOVERY: The transition element (from Vue 3) will remove the equivalent classes in the rootElement inside it.
    For example: if we add "transition" class into enter-active-class attribute in transition element,
    it will also be removed from the class in the div below
-->
<template>
    <div
        :id="country?.name"
        class="inline-block w-full min-h-full transition transform rounded-xl hover:scale-110"
        @mouseover="onHover()"
        @mouseleave="onLeave()"
    >
        <img
            ref="flag_image"
            loading="lazy"
            class="object-cover object-center w-full max-h-screen sm:h-48 rounded-t-md"
            :src="country?.flag"
            alt="country card"
        >
        <div class="p-6 transition-colors duration-700 ease-in-out flaggy-frost rounded-b-xl">
            <h2
                class="mb-4 text-lg font-extrabold leading-none text-left truncate dark:text-white"
                :title="country?.name"
            >
                {{ country?.name }}
            </h2>
            <FlagLabelInfo :truncate="true" :label-values="labelValues" />
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import FlagLabelInfo from '@/components/FlagLabelInfo.vue';
import { FLAG_CARD_TEXT_FIELDS } from '@/config/global.config';
import { initLabelValues } from '@/utils/utils';
import { Country } from '@/types/country';

@Options({
    components: {
        FlagLabelInfo,
    },
    props: {
        country: Object,
    },
})
export default class FlagCard extends Vue {
    country: Country = {} as any;

    labelValues: Array<{ label: string; value: unknown }> = [];

    created(): void {
        this.labelValues = initLabelValues(
            FLAG_CARD_TEXT_FIELDS,
            this.country as Record<keyof Country, unknown>,
        );
    }

    onHover(): void {
        (this.$refs['flag_image'] as any)?.classList.add('animate-pulse');
    }

    onLeave(): void {
        (this.$refs['flag_image'] as any)?.classList.remove('animate-pulse');
    }
}
</script>
