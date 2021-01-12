<template>
    <header class="fixed z-10 flex items-center w-full h-16 px-8 bg-green-100 lg:px-10 text-500">
        <router-link to="/">
            <h1>{{ title }}</h1>
        </router-link>
        <div class="flex items-center ml-auto">
                <svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                </svg>
            <p class="ml-1">{{ mode }}</p>
        </div>
    </header>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
@Options({
    props: {
        title: String,
        mode: String,
    },
})
export default class TheHeader extends Vue {
    title!: string;
    mode!: string;
}
</script>
<style lang="scss"></style>
