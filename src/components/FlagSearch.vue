<template>
    <div class="flex mb-8">
        <SearchInput class="w-full" />
        <DropdownInput class="ml-auto" />
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import SearchInput from '@/components/inputs/SearchInput.vue';
import DropdownInput from '@/components/inputs/DropdownInput.vue';

@Options({
    components: {
        SearchInput,
        DropdownInput
    }
})
export default class FlagSearch extends Vue {}
</script>
<style lang="scss"></style>
