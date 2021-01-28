<template>
    <header
        class="fixed z-10 flex items-center w-screen h-16 px-8 text-black transition-colors duration-500 bg-blue-100 dark:text-white dark:bg-gray-900 lg:px-10 text-500"
    >
        <!--
            Little hack: Push (redirect) / twice because
            1) The first time, the beforeRouteLeave inside FlagDetail component will be processed
            and just switching the dynamic components
            2) The second time is the real redirect
            Comment: This ensures that when clicking on the header, the user will always be
            redirected to the Gallery page (/)
        -->
        <a
            @click="$router.push('/');$router.push('/')"
            :class="[
                $route.name === 'Gallery' ? 'cursor-default' : 'cursor-pointer',
            ]"
        >
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
        </a>
        <div
            class="ml-auto cursor-pointer flaggy-header-section"
            @click="switchTheme()"
        >
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
            <p>{{ toggleModeLabel }}</p>
        </div>
    </header>
</template>
<script lang="ts">
import { DARK_MODE_LABEL, LIGHT_MODE_LABEL } from '@/config/global.config';
import { Options, Vue } from 'vue-class-component';
@Options({
    props: {
        title: String,
    },
})
export default class TheHeader extends Vue {
    title!: string;
    htmlElement!: HTMLElement;

    /**
     * DISCOVERY: It is necessary to initialize the default value for the data() property in Vue 3.
     * If we put the "!" after the variable name, Vue 3 will consider it as a read-only property,
     * so updating its value won't update the template
     */
    toggleModeLabel: string = '';

    created(): void {
        this.htmlElement = document.getElementsByTagName('html')[0];
        const theme: string | null = localStorage.getItem('darkmode');
        if (theme != null) {
            this.toggleModeLabel = LIGHT_MODE_LABEL;
            this.htmlElement.classList.add('dark');
        } else this.toggleModeLabel = DARK_MODE_LABEL;
    }

    switchTheme(): void {
        if (this.isDarkMode() === true) {
            this.disableDarkMode();
        } else {
            this.enableDarkMode();
        }
    }

    private isDarkMode(): boolean {
        return this.htmlElement.classList.contains('dark') === true;
    }

    private enableDarkMode(): void {
        this.htmlElement.classList.add('dark');
        localStorage.setItem('darkmode', '');
        this.toggleModeLabel = LIGHT_MODE_LABEL;
    }

    private disableDarkMode(): void {
        this.htmlElement.classList.remove('dark');
        localStorage.removeItem('darkmode');
        this.toggleModeLabel = DARK_MODE_LABEL;
    }
}
</script>
