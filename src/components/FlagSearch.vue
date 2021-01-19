<template>
    <div>
        <div class="flex w-full">
            <SearchInput
                v-model:value="searchValue"
                class="w-3/4 sm:w-5/6"
                @input="onSearchChange()"
            />
            <transition
                name="fade"
                enter-from-class="opacity-0"
                enter-active-class="transition duration-700 ease-in-out"
                enter-to-class="opacity-100"
                leave-from-class="opacity-100"
                leave-active-class="transition duration-500 ease-out"
                leave-to-class="opacity-0"
            >
                <span
                    v-if="count != null"
                    class="inline-flex items-center justify-center px-4 py-1 ml-1 text-xl font-bold leading-none text-red-100 bg-red-600 rounded-full md:ml-3">{{ count }}</span>
            </transition>
        </div>

        <DropdownInput
            v-model:filter="filter"
            class="mt-4 sm:ml-auto sm:mt-0"
            :options="dropdownOptions"
            @change="onFilterChange()"
        />
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import SearchInput from '@/components/inputs/SearchInput.vue';
import DropdownInput from '@/components/inputs/DropdownInput.vue';
import { FILTER_COUNTRY_OPTIONS } from '@/config/global.config';
import { Country } from '@/types/country';

@Options({
    components: {
        SearchInput,
        DropdownInput,
    },
    emits: ['search-change'],
    props: {
        count: Number,
    },
})
export default class FlagSearch extends Vue {
    dropdownOptions: Array<{
        label: string;
        searchField: keyof Country;
    }> = FILTER_COUNTRY_OPTIONS;
    filter: string = '';
    searchValue: string = '';
    debounceTimeout: number | null = null;
    count!: number;

    created(): void {
        this.filter = this.dropdownOptions[0].searchField;
    }

    onSearchChange(): void {
        if (this.debounceTimeout != null) {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = null;
        }
        this.debounceTimeout = setTimeout(() => {
            this.$emit('search-change', {
                filter: this.filter,
                searchValue: this.searchValue,
            });
        }, 300);
    }

    onFilterChange(): void {
        this.$emit('search-change', {
            filter: this.filter,
            searchValue: this.searchValue,
        });
    }
}
</script>
<style lang="scss"></style>
