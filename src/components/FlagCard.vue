<template>
  <div class="p-8 lg:w-1/4 md:w-full">
    <div class="border rounded-xl flag-container">
      <img
        class="w-full h-full md:max-h-screen flag-image rounded-t-md"
        :src="flag"
        alt="country card"
      />
      <div class="p-6">
        <h2
          class="mb-4 text-lg font-extrabold leading-none text-left truncate"
            :title="name"
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

   
      </div>
    </div>
  </div>
  
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    name: String,
    flag: String,
    population: String,
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
<style lang="scss" scoped>
.flag-container {
    max-height: auto;
}
.flag-image {
    height: auto;
}
@media (min-width: 1024px) {
    .flag-container {
        max-height: 360px;
    }
    .flag-image {
        height: 193px;
    }
}

</style>
