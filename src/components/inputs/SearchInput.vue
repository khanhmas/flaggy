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
                    <path
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                </svg>
            </button>
        </span>
        <input
            type="search"
            name="q"
            class="w-5/6 py-2 pl-10 text-sm text-gray-900 bg-white rounded-md focus:outline-none"
            placeholder="Search..."
            autocomplete="off"
        />
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class SearchInput extends Vue {}
</script>
<style lang="scss"></style>
