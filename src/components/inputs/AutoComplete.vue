<template>
    <div class="relative text-black">
        <SearchInput
            v-model:value="searchValue"
            @input="onSearchChange()"
            @keydown="onKeyDown($event)"
        />
        <ul
            v-show="showItems === true"
            v-if="results.length > 0"
            class="absolute w-full bg-white top-10"
        >
            <li
                v-for="(result, index) in results"
                :key="result.alpha3Code"
                :class="[
                    selectedCountryIndex === index ? 'bg-opacity-30' : '',
                    'flex px-3 py-1 bg-gray-100 border-b border-white cursor-pointer hover:bg-opacity-30',
                ]"
                @click="redirect(result.alpha3Code)"
            >
                <img
                    :src="result.flag"
                    alt="country flag"
                    class="self-center w-16 h-16"
                />
                <div class="ml-3">
                    <div
                        class="text-lg"
                        v-html="result._highlightResult.name.value"
                    ></div>
                    <div class="pr-1 text-md">
                        <span><em>Tags: </em></span>
                        <span v-html="result.tags"></span>
                    </div>
                </div>
                <img
                    :src="logo"
                    alt="logo"
                    class="self-center inline w-20 h-6 ml-auto align-baseline"
                />
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import SearchInput from '@/components/inputs/SearchInput.vue';
import algoliasearch, { SearchIndex } from 'algoliasearch/lite';

@Options({
    components: {
        SearchInput,
    },
    props: {
        logo: String,
    },
})
export default class AutoComplete extends Vue {
    logo!: string;

    searchValue: string = '';
    debounceTimeout: number | null = null;
    searchIndex: SearchIndex | null = null;
    results: Array<Record<string, unknown>> = [];
    showItems: boolean = false;
    selectedCountryIndex: number = 0;
    private clickCallback!: (event: MouseEvent) => void;

    private readonly DELAY_SEARCH: number = 300;
    private readonly HITS_PER_PAGE: number = 6;
    private readonly HIGHLIGHT_PRE_TAG: string = '<mark>';
    private readonly HIGHLIGHT_POST_TAG: string = '</mark>';

    private readonly AIS_SEARCH_SETTINGS: Record<string, string | number> = {
        highlightPreTag: this.HIGHLIGHT_PRE_TAG,
        highlightPostTag: this.HIGHLIGHT_POST_TAG,
        hitsPerPage: this.HITS_PER_PAGE,
    };

    created(): void {
        this.clickCallback = this.onWindowclick.bind(this);
        window.addEventListener('click', this.clickCallback);
        this.initAlgoliaSearch();
        this.initWatchProps();
    }

    beforeUnmount(): void {
        window.removeEventListener('click', this.clickCallback);
    }

    private initWatchProps(): void {
        this.$watch(
            () => this.$route.params.alpha3Code,
            () => {
                this.resetInput();
            }
        );
    }

    private resetInput(): void {
        this.results = [];
        this.searchValue = '';
        this.showItems = false;
        this.selectedCountryIndex = 0;
    }

    private initAlgoliaSearch(): void {
        const searchClient = algoliasearch(
            process.env.VUE_APP_AIS_APP_ID,
            process.env.VUE_APP_AIS_API_KEY
        );
        this.searchIndex = searchClient.initIndex(
            process.env.VUE_APP_AIS_INDEX
        );
    }

    onSearchChange(): void {
        if (this.debounceTimeout !== null) {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = null;
        }
        if (this.searchValue.length >= 2) {
            this.debounceTimeout = setTimeout(async () => {
                const {
                    hits,
                }: {
                    hits: Array<Record<string, any>>;
                } = (await this.searchIndex?.search(
                    this.searchValue,
                    this.AIS_SEARCH_SETTINGS
                )) as {
                    hits: Array<Record<string, any>>;
                };
                this.results = hits
                    .filter(
                        (hit: Record<string, any>) =>
                            hit.alpha3Code !== this.$route.params.alpha3Code
                    )
                    .map((hit: Record<string, any>) => ({
                        ...hit,
                        tags: this.buildTags(hit._highlightResult).join(', '),
                    }));
                this.showItems = true;
                this.selectedCountryIndex = 0;
            }, this.DELAY_SEARCH);
        } else this.showItems = false;
    }

    private buildTags(highlightResults: Record<string, any>): Array<string> {
        const tags: Array<string> = [];
        if (highlightResults !== undefined) {
            Object.values(highlightResults).forEach(
                (obj: Record<string, any> | Array<any>) => {
                    tags.push(...this.getHLResults(obj));
                }
            );
        }
        return [...new Set(tags)];
    }

    private getHLResults(
        obj: Record<string, any> | Array<any>,
        data: Array<string> = []
    ): Array<string> {
        let res: Array<string> = data;
        if (obj instanceof Array) {
            obj.forEach((element: Record<string, any>) => {
                res = this.getHLResults(element, res);
            });
        } else {
            const keys: Array<string> = Object.keys(obj);
            if (
                keys.includes('matchLevel') === true &&
                keys.includes('matchedWords') === true &&
                keys.includes('value') === true
            ) {
                if (obj['value'] !== '') res.push(obj['value']);
            } else {
                Object.values(obj).forEach((element: Record<string, any>) => {
                    res = this.getHLResults(element, res);
                });
            }
        }
        return res;
    }

    redirect(alpha3Code: string): void {
        this.$router.push({
            name: 'Detail',
            params: { alpha3Code },
            query: { redirect: 'force' },
        });
    }

    private onWindowclick(event: MouseEvent): void {
        if (
            (event.target as HTMLElement).className.includes('search-input') ===
            false
        ) {
            this.showItems = false;
        } else {
            this.showItems = true;
        }
    }

    onKeyDown(event: KeyboardEvent): void {
        switch (event.key) {
            case 'Escape':
                event.preventDefault();
                this.showItems = false;
                break;
            case 'Backspace':
                event.stopPropagation();
                break;
            case 'ArrowUp':
                if (this.selectedCountryIndex <= 0) {
                    this.selectedCountryIndex = this.results.length - 1;
                } else this.selectedCountryIndex--;
                break;
            case 'ArrowDown':
                if (this.selectedCountryIndex >= this.results.length - 1) {
                    this.selectedCountryIndex = 0;
                } else this.selectedCountryIndex++;
                break;
            case 'Enter':
                this.redirect(
                    this.results[this.selectedCountryIndex].alpha3Code as string
                );
                break;
            default:
                break;
        }
    }
}
</script>
