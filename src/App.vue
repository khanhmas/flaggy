<template>
    <div
        class="min-h-screen transition-colors duration-500 bg-blue-400 dark:bg-indigo-900"
    >
        <TheHeader :title="'Where in the world ?'" />
        <!--
            DISCOVERY: Adding z-10 is to ensure that the button is above the image. Otherwise, the clickEvent
            will be executed on the image instead of the button.
            Hence, when clicking on the image, we accidentally trigger the mouseleave event
            on the button resulting in executing the .blur() (CF BackButton component)
        -->
        <transition
            name="fade"
            mode="out-in"
            enter-from-class="opacity-0"
            enter-active-class="transition duration-700 ease-in"
            enter-to-class="opacity-100"
            leave-from-class="opacity-100"
            leave-active-class="transition duration-500 ease-out"
            leave-to-class="opacity-0"
        >
            <BackButton
                v-if="$route.name === 'Detail'"
                class="fixed z-10 top-20 left-10"
            >
                <template #svg>
                    <svg
                        class="absolute top-3 left-2.5 dark:text-white"
                        width="20"
                        height="15"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                </template>
                <template #default>
                    Back
                </template>
            </BackButton>
        </transition>

        <router-view v-slot="slotProps">
            <transition
                name="fade"
                mode="out-in"
                enter-from-class="opacity-0"
                enter-active-class="transition duration-300 ease-in-out"
                enter-to-class="opacity-100"
                leave-from-class="opacity-100"
                leave-active-class="transition duration-300 ease-in-out"
                leave-to-class="opacity-0"
            >
                <keep-alive>
                    <component :is="slotProps.Component" />
                </keep-alive>
            </transition>
        </router-view>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TheHeader from '@/components/TheHeader.vue';
import BackButton from '@/components/BackButton.vue';

@Options({
    components: {
        TheHeader,
        BackButton,
    },
})
export default class App extends Vue {}
</script>
