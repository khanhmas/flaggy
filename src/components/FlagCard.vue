<template>
    <!-- <transition
        name="scale"
        mode="out-in"
        enter-from-class="scale-0"
        enter-active-class="transition duration-700 ease-in-out transform"
        enter-to-class="scale-100"
    > -->
        <div
            @mouseover="onHover()"
            @mouseleave="onLeave()"
            class="inline-block w-full min-h-full transition transform rounded-xl flag-container hover:scale-110"
            :id="name"
        >
            <img
                loading="lazy"
                ref="flag_image"
                class="object-cover object-center w-full md:max-h-screen flag-image rounded-t-md lg:w-full lg:h-48"
                :src="flag"
                alt="country card"
            />
            <div class="p-6 flaggy-frost rounded-b-xl">
                <h2
                    class="mb-4 text-lg font-extrabold leading-none text-left truncate"
                    :title="name"
                >
                    {{ name }}
                </h2>
                <FlagLabelInfo :labelValues="labelValues" />
            </div>
        </div>
    <!-- </transition> -->
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import FlagLabelInfo from '@/components/FlagLabelInfo.vue';
import { FLAG_CARD_TEXT_FIELDS } from '@/config/global.config';
import { FlagCardLabel } from '@/interfaces/flag_card_label';
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
    },
})
export default class FlagCard extends Vue implements FlagCardLabel {
    name!: string;
    flag!: string;
    population!: string;
    region!: string;
    capital!: string;

    labelValues: Array<{ label: string; value: unknown }> = [];
    showable: boolean = false;

    created(): void {
        setTimeout(() => {
            this.showable = true;
        }, 1000);
        this.labelValues = initLabelValues(
            FLAG_CARD_TEXT_FIELDS,
            this as Record<string, unknown>
        );
    }

    mounted(): void {
        // setTimeout(() => {
        //     this.showable = true;
        // }, 1000);
    }

    onHover(): void {
        (this.$refs['flag_image'] as any)?.classList.add('animate-pulse');
    }

    onLeave(): void {
        (this.$refs['flag_image'] as any)?.classList.remove('animate-pulse');
    }
}
</script>
<style lang="scss" scoped></style>
