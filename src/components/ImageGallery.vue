<template>
    <div class="relative top-10">
        <TheSpinner class="small" />
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TheSpinner from '@/components/TheSpinner.vue';

@Options({
    components: {
        TheSpinner
    }
})
export default class ImageGallery extends Vue {

}
</script>
