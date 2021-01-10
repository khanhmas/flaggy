<template>
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

<style lang="scss" scoped>
// .fade-enter-from,
// .fade-leave-to {
//     opacity: 0;
// }
// .fade-enter-to,
// .fade-leave-from {
//     opacity: 1;
// }
// .fade-enter-active, .fade-leave-active {
//     transition: all .5s ease-out;
// }

// .fade-leave-active {
//     transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
// }
</style>
