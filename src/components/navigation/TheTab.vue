<template>
    <!-- <ol class="flex px-3 py-2 text-gray-700 bg-blue-100 rounded">
        <li class="text-indigo-600">Infos</li>
        <li>
            <span class="px-2 text-gray-500 select-none">&rarr;</span>
            <a href="#" class="hover:underline">Landscapes</a>
        </li>
    </ol> -->
    <nav class="w-full px-8 pt-2 bg-blue-100 shadow-md rounded-xl">
        <div class="flex justify-center">
            <a
                class="py-3 mr-8 text-xs font-bold tracking-wide text-teal-600 no-underline uppercase border-b-2 border-teal-600"
                href="#"
            >
                Information
            </a>
            <a
                class="py-3 mr-8 text-xs font-bold tracking-wide no-underline uppercase border-b-2 border-transparent text-grey-dark"
                href="#"
            >
                Landscapes
            </a>
        </div>
    </nav>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        items: Array,
    },
})
export default class TheTab extends Vue {
    items!: Array<string>;
}
</script>
