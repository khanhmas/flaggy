<template>
    <div class="inline-block transition-all transform border shadow hover:animate-pulse hover:shadow-2xl rounded-xl flag-container hover:scale-110" :id="name">
        <img
            class="md:max-h-screen flag-image rounded-t-md"
            :src="flag"
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
import {FLAG_CARD_TEXT_FIELDS} from '@/config/global.config';
import {FlagCardLabel} from '@/interfaces/flag_card_label';
import {FlagDetailLabel} from '@/interfaces/flag_detail_label';

@Options({
    components: {
        FlagLabelInfo
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

    labelValues: Array<{label: string, value: string}> = [];

    created(): void {
        this.initLabelValues();
    }

    initLabelValues(): void {
        Object.entries(FLAG_CARD_TEXT_FIELDS).forEach(([property, label]: [string, string]) => {
            this.labelValues.push({
                label,
                value: this[property as keyof FlagCardLabel]
            });
        });
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
