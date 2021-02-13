<template>
    <div class="relative text-gray-600">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <button class="p-1 focus:outline-none focus:shadow-outline">
                <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    class="w-6 h-6"
                >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
        </span>
        <input
            :value="value"
            type="search"
            name="q"
            class="w-full py-2 pl-10 text-sm text-gray-900 bg-white rounded-md search-input focus:outline-none"
            placeholder="Search a country..."
            autocomplete="off"
            @input="$emit('update:value', $event.target.value)"
        />
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        value: String,
    },
    emits: ['update:value'],
})
export default class SearchInput extends Vue {
    value!: string;
}
</script>
