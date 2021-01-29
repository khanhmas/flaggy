<template>
    <div class="text-white">
        <router-link to="/" class="flex flex-col items-center justify-center">
            <p class="text-9xl">404</p>
            <p>Go back to home page</p>
        </router-link>
    </div>
</template>
<script>
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class NotFound extends Vue {}
</script>
