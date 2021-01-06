<template>
  <div class="p-8 lg:w-1/4 md:w-full">
    <div class="border rounded-xl">
      <img
        class="object-cover object-center w-full h-full rounded-t-md"
        :src="flag"
        alt="country card"
      />
      <div class="p-6">
        <h2
          class="flex items-center justify-start mb-4 text-lg font-extrabold leading-none text-left"
        >
          {{ name }}
        </h2>
        <div class="info-row">
          <span class="font-semibold">Population: </span>
          <span>{{population}}</span>
        </div>
        <div class="info-row">
          <span class="font-semibold">Region: </span>
          <span>{{region}}</span>
        </div>
        <div class="info-row">
          <span class="font-semibold">Capital: </span>
          <span>{{capital}}</span>
        </div>

        <!-- <button
          class="w-full px-8 py-2 font-semibold text-black transition duration-500 ease-in-out transform bg-white border rounded-lg shadow-xl hover:text-white hover:border-black hover:bg-black focus:shadow-outline focus:outline-none"
        >
          Button
        </button> -->
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
    population: Number,
    region: String,
    capital: String,
  },
})
export default class FlagCard extends Vue {
  name!: string;
  flag!: string;
  population!: string;
  region!: string;
  capital!: string;
}
</script>
<style lang="scss scoped"></style>
