<template>
  <div class="app">
    <HomePage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomePage from './pages/HomePage.vue'
import { useLocationStore } from "@/stores/LocationStore"
const locationStore = useLocationStore()
export default defineComponent({
  components: {
    HomePage
  },
  // mounted: () => {
  //   // navigator.geolocation.getCurrentPosition
  // }
});
</script>

<style>

</style>
