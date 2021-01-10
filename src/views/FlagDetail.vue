<template>
    <div class="grid grid-cols-2 gap-4">
        <div class="flex items-center justify-center">
            <img class="w-full h-2/3" :src="flag" alt="country" />
        </div>
        <div class="flex flex-col justify-center">
            <p class="text-3xl font-bold">{{ name }}</p>
            <div class="grid grid-cols-2 gap-4 mt-10">
                <div class="info-col-1">
                    <FlagLabelInfo :labelValues="labelValuesCol1" />
                </div>
                <div class="info-col-2">
                    <FlagLabelInfo :labelValues="labelValuesCol2" />
                </div>
            </div>
            <div class="mt-10" v-if="borders.length > 0">
                <p class="mr-5">Border countries:</p>
                <FlagTag>
                    <div
                        v-for="border of borders"
                        :key="border"
                        class="inline-block w-24 max-w-md mr-3 text-xs text-center align-middle transition bg-white border border-gray-300 border-solid rounded cursor-pointer hover:bg-gray-200 px-auto"
                    >
                        <p class="inline-block w-20 truncate">
                            {{ border }}
                        </p>
                    </div>
                </FlagTag>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import FlagTag from '@/components/FlagTag.vue';
import FlagLabelInfo from '@/components/FlagLabelInfo.vue';
import { Country } from '@/types/country';
import { initLabelValues } from '@/utils/utils';
import { FLAG_DETAIL_TEXT_FIELDS } from '@/config/global.config';

// Vue.registerHooks([
//     'beforeRouteEnter',
//     'beforeRouteLeave',
//     'beforeRouteUpdate'
// ]);

@Options({
    props: {
        name: String,
        population: String,
        flag: String,
        nativeName: String,
        region: String,
        subregion: String,
        capital: String,
        topLevelDomain: String,
        currencies: String,
        languages: String,
        borders: Array,
        callingCodes: String,
    },
    components: {
        FlagTag,
        FlagLabelInfo,
    },
})
export default class FlagDetail extends Vue {
    name!: string;
    population!: string;
    flag!: string;
    nativeName!: string;
    region!: string;
    subregion!: string;
    capital!: string;
    topLevelDomain!: string;
    currencies!: string;
    languages!: string;
    borders!: Array<string>;
    callingCodes!: string;

    labelValuesCol1: Array<{ label: string; value: unknown }> = [];
    labelValuesCol2: Array<{ label: string; value: unknown }> = [];

    created(): void {
        // console.log(this.name);
        // console.log(this.$route.params.name);

        // console.log(this.population);
        // console.log(this.$route.params.population);
        const labelValues: Array<{
            label: string;
            value: unknown;
        }> = initLabelValues(
            FLAG_DETAIL_TEXT_FIELDS,
            this as Record<string, unknown>,
            ['borders']
        );
        this.labelValuesCol1 = labelValues.slice(0, 6);
        this.labelValuesCol2 = labelValues.slice(6);
    }

    // beforeRouteEnter(to: any, from: any, next: any): void {
    //     console.log('beforeRouteEnter');
    //     console.log(to, from, next);
    //     next((vm: any) => {
    //         console.log(vm);
    //     });
    // }
}
</script>

<style lang="scss" scoped></style>
