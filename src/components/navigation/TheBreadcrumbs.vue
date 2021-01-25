<template>
    <ol class="flex px-3 py-2 text-gray-700 bg-blue-100 rounded">
        <li class="text-indigo-600">Infos</li>
        <li>
            <span class="px-2 text-gray-500 select-none">&rarr;</span>
            <a href="#" class="hover:underline">Landscapes</a>
        </li>
    </ol>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        items: Array
    }
})
export default class TheBreadcrumbs extends Vue {
    items!: Array<string>;
}
</script>
