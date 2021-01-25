<!-- DISCOVERY: The key here is used to replay animation when updating the component on the same route
    add transition and the other related classes to customize animation
    REALLY IMPORTANT: Don't put comment right after the template tag. Otherwise, it will cause a routing problem
    EX: When in detail page, clicking on the header redirecting to / doesn't work anymore
-->
<template>
    <div
        :key="alpha3Code"
        class="px-10 pt-32 pb-24 transition duration-700 ease-in-out"
    >
        <transition
            name="fade"
            mode="out-in"
            enter-from-class="opacity-0"
            enter-active-class="transition duration-700 ease-in-out"
            enter-to-class="opacity-100"
            leave-from-class="opacity-100"
            leave-active-class="transition duration-700 ease-in-out"
            leave-to-class="opacity-0"
        >
            <keep-alive>
                <component :is="additionalData['dynamicComponent']" :alpha3Code="alpha3Code" />
            </keep-alive>
        </transition>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import DetailInfo from '@/views/DetailInfo.vue';
import PhotoGallery from '@/views/PhotoGallery.vue';

@Options({
    props: {
        alpha3Code: String,
        additionalData: Object,
    },
    components: {
        DetailInfo,
        PhotoGallery,
    },
})
export default class FlagDetail extends Vue {
    alpha3Code!: string;
    additionalData!: {
        dynamicComponent: string;
    };
}
</script>
