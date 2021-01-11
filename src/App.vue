<template>
    <TheHeader :title="'Where in the world ?'" :mode="'Dark mode'" />
    <router-view #default="slotProps">
        <transition name="fade" mode="out-in"
            enter-from-class="opacity-0"
            enter-active-class="transition duration-300 ease-in-out"
            enter-to-class="opacity-100"
            leave-from-class="opacity-100"
            leave-active-class="transition duration-300 ease-in-out"
            leave-to-class="opacity-0">
            <component :is="slotProps.Component"></component>
        </transition>
    </router-view>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TheHeader from '@/components/TheHeader.vue';
@Options({
    components: {
        TheHeader
    }
})
export default class App extends Vue {
}
</script>
