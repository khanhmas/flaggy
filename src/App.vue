<template>
    <router-view #default="slotProps">
        <transition name="fade" mode="out-in">
            <component :is="slotProps.Component"></component>
        </transition>
    </router-view>
</template>

<style lang="scss" scoped>
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}
.fade-enter-active {
    transition: all .3s ease-out;
}

.fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
</style>
