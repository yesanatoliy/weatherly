<template>
    <div>
        <SearchComponent />
        <CurrentWeatherComponent />
        <ForecastComponent />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CurrentWeatherComponent from '../components/CurrentWeatherComponent.vue'
import ForecastComponent from '../components/ForecastComponent.vue'
import SearchComponent from '@/components/SearchComponent.vue';
export default defineComponent({
  name: 'HomePage',
  components: {
    CurrentWeatherComponent,
    ForecastComponent,
    SearchComponent
  }
})
</script>

<style>

</style>