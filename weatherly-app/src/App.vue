<template>
  <div class="app">
    <HomePage />
    <p></p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import HomePage from './pages/HomePage.vue'
import { useLocationStore } from "@/stores/LocationStore.js"


export default defineComponent({
  components: {
    HomePage
  },
  setup(){
    const locationStore = useLocationStore()

    onMounted(() => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        await locationStore.getCurrentWeather(position.coords)
      })
    })
  }
});
</script>

<style>

</style>
