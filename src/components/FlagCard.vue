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
        />
        <div
            class="p-6 transition-colors duration-700 ease-in-out flaggy-frost rounded-b-xl"
        >
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
    country!: Country;

    labelValues: Array<{ label: string; value: unknown }> = [];

    created(): void {
        // console.log('created ', this.country)
        let data: Record<keyof Country, unknown> = { ...this.country };
        if (this.country._highlightResult !== undefined) {
            Object.keys(this.country._highlightResult).forEach(
                (key: string) => {
                    const countryKey: keyof Country = key as keyof Country;
                    if (typeof this.country[countryKey] === 'string') {
                        data[countryKey] = this.country._highlightResult[
                            countryKey
                        ].value;
                    } else if (this.country[countryKey] instanceof Array) {
                        data[countryKey] = this.loopRArray(
                            this.country._highlightResult[countryKey] as Array<
                                Record<string, any>
                            >
                        );
                    }
                }
            );
        } else data = this.country;
        console.log(this.country);
        console.log(data);
        this.labelValues = initLabelValues(FLAG_CARD_TEXT_FIELDS, data);
    }

    private loopRArray(arr: Array<Record<string, any>>): Array<any> {
        const result: Array<any> = [];
        arr.forEach((element: Record<string, any>) => {
            const keys: Array<string> = Object.keys(element);
            const hlObjectString: string = this.getHLString(keys, element);
            if (hlObjectString !== '') {
                result.push(hlObjectString);
            } else {
                const obj: any = {};
                keys.forEach((key: string) => {
                    obj[key] = this.getHLString(
                        Object.keys(element[key]),
                        element[key]
                    );
                });
                result.push(obj);
            }
        });
        return result;
    }

    private getHLString(keys: Array<string>, obj: Record<string, any>): string {
        if (
            keys.includes('matchLevel') === true &&
            keys.includes('matchedWords') === true &&
            keys.includes('value') === true
        ) {
            return obj['value'];
        }
        return '';
    }

    onHover(): void {
        (this.$refs['flag_image'] as HTMLElement)?.classList.add(
            'animate-pulse'
        );
    }

    onLeave(): void {
        (this.$refs['flag_image'] as HTMLElement)?.classList.remove(
            'animate-pulse'
        );
    }
}
</script>
