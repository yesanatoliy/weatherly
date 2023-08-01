<template>
  <div class="app">
    <HomePage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomePage from './pages/Home.vue'
export default defineComponent({
  name: 'App',
  components: {
    HomePage
  },
  mounted: () => {
    // navigator.geolocation.getCurrentPosition
  }
});
</script>

<style>

</style>
