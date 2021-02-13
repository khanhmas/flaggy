<template>
    <div class="relative">
        <SearchInput v-model:value="searchValue" @input="onSearchChange()" />
        <ul class="absolute w-full bg-white rounded-md top-10">
            <li class="flex px-3 py-1 border-b border-gray-300">
                <img
                    width="64"
                    height="64"
                    src="https://restcountries.eu/data/chn.svg"
                    alt="country"
                    class="inline align-baseline"
                />
                <div class="ml-3">
                    <div class="text-lg">aaaaaaaaaaaaaaaaa</div>
                    <div class="text-md">
                        <span>Tags: </span>
                        <span v-html="html"></span>
                    </div>
                </div>
                <img
                    :src="logo"
                    alt="logo"
                    class="self-center inline h-6 ml-auto align-baseline"
                />
            </li>
            <li class="p-3 border-b border-gray-300">aaaaaaaaaaaaaaaaa</li>
            <li class="p-3 border-gray-300">aaaaaaaaaaaaaaaaa</li>
        </ul>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import SearchInput from '@/components/inputs/SearchInput.vue';
import algoliasearch from 'algoliasearch/lite';

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

    html: string = '<mark>bei</mark>jing, china';
    searchValue: string = '';

    // mounted(): void {
    //     this.initAlgoliaSearch();
    // }

    // private initAlgoliaSearch(): void {
    //     const searchClient = algoliasearch(
    //         process.env.VUE_APP_AIS_APP_ID,
    //         process.env.VUE_APP_AIS_API_KEY
    //         // 'B1G2GM9NG0',
    //         // 'aadef574be1f9252bb48d4ea09b5cfe5'
    //     );
    //     const index = searchClient.initIndex(process.env.VUE_APP_AIS_INDEX);
    //     index
    //         .search('fra', {
    //             highlightPreTag: '<mark>',
    //             highlightPostTag: '</mark>',
    //         })
    //         .then((res: any) => {
    //             console.log(res);
    //         });
    // }

    onSearchChange(): void {
        console.log(this.searchValue);
    }
}
</script>
