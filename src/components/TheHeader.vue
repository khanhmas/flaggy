<template>
    <header
        class="fixed z-10 flex items-center w-full h-16 px-8 bg-emerald-200 lg:px-10 text-500"
    >
        <router-link to="/">
            <div class="flaggy-header-section">
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
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                </svg>
                <h1>{{ title }}</h1>
            </div>
        </router-link>
        <div class="ml-auto flaggy-header-section">
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
            <p>{{ mode }}</p>
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
