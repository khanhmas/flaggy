<template>
  <div class="px-2 py-2 lg:w-1/4 md:w-full">
    <div class="border rounded-xl">
      <img
        class="object-cover object-center w-full h-full mb-6 rounded-t-xl"
        :src="flag"
        alt="country card"
      />
      <div class="p-6">
        <h2
          class="flex items-center justify-start mt-2 mb-4 text-3xl font-bold leading-none text-left text-blue-800 lg:text-6xl"
        >
          $8
          <span class="ml-1 text-base text-gray-600">/mo</span>
        </h2>
        <h2
          class="mb-3 text-lg font-semibold text-gray-700 lg:text-2xl title-font"
        >
          Bundle 1
        </h2>
        <p class="mb-4 text-base leading-relaxed">
          {{name}}
        </p>
        <button
          class="w-full px-8 py-2 font-semibold text-black transition duration-500 ease-in-out transform bg-white border rounded-lg shadow-xl hover:text-white hover:border-black hover:bg-black focus:shadow-outline focus:outline-none"
        >
          Button
        </button>
      </div>
    </div>
  </div>
  <!-- <div class="flex flex-wrap w-1/4">
    <div class="w-full p-1 md:p-2">
      <img
        alt="flag card"
        class="block object-cover object-center w-full h-full rounded-lg"
        :src="flag"
      />
    </div>
    <p class="text-red-500">{{ name }}</p>
  </div> -->
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    name: String,
    flag: String,
  },
})
export default class FlagCard extends Vue {
  // name!: string;
}
</script>
<style lang="scss scoped"></style>
