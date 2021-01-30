<template>
    <div
        class="min-h-screen transition-colors duration-500 bg-blue-400 dark:bg-indigo-900"
    >
        <TheHeader :title="'Where in the world ?'" />
        <!--
            DISCOVERY: Adding z-10 is to ensure that the button is above the flag image. Otherwise, the clickEvent
            will be executed on the image instead of the button.
            Hence, when clicking on the image, we accidentally trigger the mouseleave event
            on the button resulting in executing the .blur() (CF BackButton component)
        -->
        <button
            @click="updateNewVersion()"
            v-if="showUpdateButton === true"
            class="fixed top-0 z-10 px-4 py-3 mr-6 font-bold text-center text-white transition duration-300 duration-700 ease-out ease-in-out bg-blue-500 rounded-lg left-1/2 hover:bg-blue-600"
        >Update new version</button>
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
            <div
                v-if="$route.name === 'Detail'"
                class="fixed left-0 z-10 w-screen px-10 top-20"
            >
                <TheTab :items="TABS" @setDefault="setDynamicComponent($event)">
                    <template #default="slotProps">
                        <a
                            @click="onTabClick(slotProps.item)"
                            :class="[
                                'transition duration-700 ease-in-out py-3 cursor-pointer text-center mr-4 md:mr-8 text-xs font-bold tracking-wide no-underline md:uppercase border-b-2',
                                dynamicComponentData['label'] ===slotProps.item.label
                                    ? 'text-teal-500 border-teal-500'
                                    : 'text-gray-900 border-transparent',
                            ]"
                        >{{ slotProps.item.label }}</a
                        >
                    </template>
                </TheTab>
                <BackButton>
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
            </div>
        </transition>

        <router-view
            v-slot="slotProps"
            class="px-8 pt-56 pb-10 sm:pt-44 lg:px-10"
        >
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
                    <component
                        :is="slotProps.Component"
                        :additional-data="dynamicComponentData"
                    />
                </keep-alive>
            </transition>
        </router-view>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TheHeader from '@/components/navigation/TheHeader.vue';
import TheTab from '@/components/navigation/TheTab.vue';
import BackButton from '@/components/BackButton.vue';
import { TABS, TabMetadata } from '@/config/global.config';

@Options({
    components: {
        TheHeader,
        TheTab,
        BackButton,
    },
})
export default class App extends Vue {
    readonly TABS: Array<TabMetadata> = TABS;

    dynamicComponentData: Record<string, unknown> = {};
    showUpdateButton: boolean = false;

    created(): void {
        if ((this as any).$workbox != null) {
            (this as any).$workbox.addEventListener('waiting', () => {
                this.showUpdateButton = true;
            });
        }
    }

    async updateNewVersion(): Promise<any> {
        this.showUpdateButton = false;
        await (this as any).$workbox.messageSW({ type: 'SKIP_WAITING' });
    }

    onTabClick(tab: TabMetadata): void {
        if (this.$store.getters['country/countries'].length > 0) {
            this.setDynamicComponent(tab);
        }
    }

    setDynamicComponent(tab: TabMetadata): void {
        /**
         * IMORTANT: Need to assign the new object reference in order to re-render the dynamic component
         * because we are passing in the entire object into the :component attribute
         * @comment: #navigation: keep this as a reference in the case where the weird bugs appear because of navigation
         */
        // this.dynamicComponentData = {
        //     ...this.dynamicComponentData,
        //     dynamicComponent: componentName,
        // };
        this.dynamicComponentData = {
            ...tab,
        };
    }
}
</script>
