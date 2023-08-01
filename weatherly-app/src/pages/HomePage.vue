<template>
    <div>
        <SearchComponent />
        <CurrentWeatherComponent />
        <ForecastComponent />
    </div>
</template>

<script setup lang="ts">
import CurrentWeatherComponent from '../components/CurrentWeatherComponent.vue'
import ForecastComponent from '../components/ForecastComponent.vue'
import SearchComponent from '@/components/SearchComponent.vue';
</script>

<style>

</style>