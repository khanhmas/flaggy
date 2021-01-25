<template>
    <nav class="w-full px-8 pt-2 bg-blue-100 shadow-md rounded-xl">
        <div class="flex justify-center">
            <!-- <a
                v-for="item of items"
                :key="item.label"
                :class="[
                    'py-3 mr-8 text-xs font-bold tracking-wide no-underline uppercase border-b-2',
                    activeComponent === item.componentName
                        ? 'text-teal-500 border-teal-500'
                        : 'text-gray-900 border-transparent',
                ]"><slot :item="item" /></a> -->
            <slot v-for="item of items" :key="item.label" :item="item" />
        </div>
    </nav>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { TabMetadata } from '@/config/global.config';

@Options({
    props: {
        items: Array,
        activeComponent: String,
    },
    emits: ['set-default'],
})
export default class TheTab extends Vue {
    items!: Array<TabMetadata>;
    activeComponent!: string;

    created(): void {
        const defaultTab: TabMetadata | undefined = this.items.find(
            (tab: TabMetadata) => tab.default === true
        );
        if (defaultTab != null) this.$emit('set-default', defaultTab);
    }
}
</script>
