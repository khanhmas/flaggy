<template>
    <div class="inline-block">
        <div class="inline-block w-24 max-w-md mr-3 text-xs text-center align-middle transition bg-white border border-gray-300 border-solid rounded cursor-pointer hover:bg-gray-200 px-auto">
            <p class="inline-block w-20 truncate">France</p>
        </div>
        <div class="inline-block w-24 max-w-md mr-3 text-xs text-center align-middle transition bg-white border border-current border-gray-300 border-solid rounded cursor-pointer hover:bg-gray-200">
            <p class="inline-block w-20 truncate">Germany</p>
        </div>
        <div class="inline-block w-24 max-w-md mr-3 text-xs text-center align-middle transition bg-white border border-current border-gray-300 border-solid rounded cursor-pointer hover:bg-gray-200">
           <p class="inline-block w-20 truncate">Netherlands</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        name: String
    }
})
export default class FlagTag extends Vue {
    name!: string;

};
</script>
<style lang="scss" scoped>

</style>
