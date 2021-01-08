<template>
    <router-link :to="{name: 'Detail', params: {name, population}}" class="p-8 transition transform hover:scale-110 lg:w-1/4 md:w-full" :id="name">
        <div class="transition-all border shadow hover:shadow-2xl rounded-xl flag-container">
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
                <FlagLabelInfo :label_values="display_values" />
            </div>
        </div>
    </router-link>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import FlagLabelInfo from '@/components/FlagLabelInfo.vue';
import {FLAG_CARD_TEXT_FIELDS} from '@/config/global.config';
import {FlagCardLabel} from '@/interfaces/flag_card';

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

    display_values: Record<string, string> = {};


    created(): void {
        this.display_values = FLAG_CARD_TEXT_FIELDS.reduce((obj: Record<keyof FlagCardLabel, string>, field: keyof FlagCardLabel) => {
            obj[field] = this[field];
            return obj;
        }, this.display_values);
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
